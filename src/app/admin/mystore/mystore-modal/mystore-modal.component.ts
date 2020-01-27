import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, ControlContainer } from "@angular/forms";
import { Subscription } from 'rxjs';
import { MyStoreService } from '../../../service/my-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mystore-modal',
  templateUrl: './mystore-modal.component.html',
  styleUrls: ['./mystore-modal.component.scss']
})
export class MystoreModalComponent implements OnInit {
  subscription: Subscription;
  @Input() category: String;
  @Input() productId;
  showView: Boolean = false;
  showCreate: Boolean = false;
  showEdit: Boolean = false;
  fieldDisabled: Boolean = false;
  fieldDisabledone: Boolean = false;
  resetSquadsArray: Boolean = false;
  isView: Boolean;
  storeForm: FormGroup;
  productID;
  categoryId;
  productName;
  sizes;
  subCategoryId;
  allCategory;
  subCategory;
  productPrice;
  existingCategoryName = [];
  existingProductId = [];
  floatingSizesEmpty: boolean = false;
  productSizeAlreadyAdded: boolean = false;
  private control: AbstractControl;
  index;
  sizeDetails;
  productSizeId;
  checkProductSize;
  productDescription;
  historyProductSize = [];
  productAdd = [];
  productDelete = [];
  productTrimName;
  // private control:AbstractControl;
  // private floatingSizesList: Subscription;
  1
  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<MystoreModalComponent>,
    private mystoreService: MyStoreService, ) { }

  ngOnInit() {
    this.mystoreService.getProductList();

    this.subscription = this.mystoreService.getSameSizeProductListner()
      .subscribe((data: any) => {
        this.checkProductSize = data.data;
      })

    this.subscription = this.mystoreService.getProductListListener()
      .subscribe((data: any) => {
        if (data !== undefined) {
          let allProduct = data.data;

          this.existingCategoryName = [];
          for (let key of allProduct) {
            this.existingCategoryName.push(key.productName.toLowerCase());
          }
          this.existingProductId = [];
          for (let key of allProduct) {
            this.existingProductId.push(key.productId);
          }
        }
      });
    this.subscription = this.mystoreService.getFloatingSizesListener().subscribe((data: any) => {
      this.sizes = data.data;
    });
    this.mystoreService.getFloatingSizes();
    this.subscription = this.mystoreService.getCategoriesListener()
      .subscribe((data: any) => {
        this.allCategory = data.data;
      });
    this.mystoreService.getCategories();
    this.subscription = this.mystoreService.getSubCategoriesListener()
      .subscribe((data: any) => {
        this.subCategory = data.data;
      })


    this.isView = this.category == 'View' ? true : false;

    if (this.category === 'View' || this.category === "View Product") {
      this.viewProduct();

    } else if (this.category == "Create") {
      this.category = "Add Product"
      this.fieldDisabled = false;
      this.isView = false;
    }


    this.initializeReactiveForms();
  }
  getSubCategory(category_id: number) {
    this.mystoreService.getSubByCategory(category_id);
  }

  viewProduct() {
    if (this.category === 'Edit Product') {
      this.isView = true;
      Object.keys(this.storeForm.controls).forEach(key => {
        this.storeForm.get(key).disable();
      });
    }
    this.fieldDisabled = true;
    this.isView = true;
    this.category = "View Product";
    if (this.category !== "Edit Product") { this.loadProductFormDetails(); }
  }

  close() {
    this.dialog.closeAll();
  }
  loadProductFormDetails() {
    this.mystoreService.getProductDetails(this.productId)
    this.mystoreService.getProductSizeDetails(this.productId)
    this.mystoreService.getCategoryDetails(this.productId)
    this.mystoreService.getProductDetailsListener().subscribe((data: any) => {
      let productDetails = data.data;
      this.productID = productDetails[0].id;
      this.productName = productDetails[0].name;
      this.productTrimName = this.productName.trim().toLowerCase();
      this.productPrice = productDetails[0].price;
      this.productDescription = productDetails[0].description;
      this.storeForm.patchValue({
        productID: this.productID,
        productName: this.productName,
        price: this.productPrice,
        productDescription: this.productDescription,
      });
    });
    this.mystoreService.getProductsSizeListener().subscribe((data: any) => {
      this.sizeDetails = data.data;
      for (let i = 0; i < this.sizeDetails.length; i++) {
        if (this.sizeDetails[0].view != null) {
          const control = new FormControl({ "value": this.sizeDetails[i].view, "viewValue": this.sizeDetails[i].viewValue });
          this.sizesArray.push(control);
        }
      }
    })

    this.mystoreService.getProductsCategoryListener().subscribe((data: any) => {
      let categoryDetails = data.data;
      if (categoryDetails) {
        this.getSubCategory(categoryDetails[0].categoryId)
        this.categoryId = categoryDetails[0].categoryId;
        this.subCategoryId = categoryDetails[0].subId;
        this.storeForm.patchValue({
          categoryId: this.categoryId,
          subCategoryId: this.subCategoryId,
        })
      }
    })

  }
  initializeReactiveForms() {
    this.storeForm = new FormGroup({
      productID: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required, this.customValidationsProductId.bind(this)]),
      productName: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required, this.customValidationsProductName.bind(this)]),
      price: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required, this.customValidationsprice.bind(this)]),
      categoryId: new FormControl({ value: null, disabled: this.fieldDisabled }),
      subCategoryId: new FormControl({ value: null, disabled: this.fieldDisabled }),
      sizes: new FormControl({ value: null, disabled: this.fieldDisabled }, [this.customValidationsSizes.bind(this)]),
      productDescription: new FormControl({ value: null, disabled: this.fieldDisabled }),
      sizesArray: new FormArray([]),
      historyProductSize: new FormControl(this.historyProductSize),

    })
  }
  editProduct() {
    this.storeForm.get('historyProductSize').setValue(this.sizesArray.value);
    let historyAssignedProductSize = this.sizesArray.value;

    this.category = "Edit Product"
    this.fieldDisabled = false;
    this.isView = false;
    this.resetArrays();

    Object.keys(this.storeForm.controls).forEach(key => {
      if (key !== "dtcLocation") {
        this.storeForm.get(key).enable();
      }
    });
    for (let i = 0; i < this.sizeDetails.length; i++) {
      if (this.sizeDetails[0].view !== null) {
        const control = new FormControl({ "value": this.sizeDetails[i].view, "viewValue": this.sizeDetails[i].viewValue });
        this.sizesArray.push(control);
      }
    }
    // this.tribeForm.get('historySquadsToTribe').setValue(this.squadsArray.value);
    // let historyAssignedSquads = this.squadsArray.value;
    // console.log(this.squadsArray.value, ' ================ meron na ONCLICK EDIT ==');
  }
  resetArrays() {
    while (this.sizesArray.length !== 0) {
      this.sizesArray.removeAt(0);
    }
    this.productAdd = [];
  }
  onAddSize(topic) {
    this.productSizeAlreadyAdded = false;
    if (topic.value) {
      let floatingsizes = this.sizes.find(item => item.value === topic.value);

      this.sizes = this.sizes.filter((obj) => {
        return obj.value !== topic.value['value'];
      });
      const control = new FormControl({ "value": topic.value.value, "viewValue": topic.value.viewValue });
      this.sizesArray.push(control);
      if (this.category === "Edit Product") {
        this.productAdd.push(control.value);
      }
      topic.value = '';
    }
    this.storeForm.get('sizes').reset();
    this.floatingSizesEmpty = false;
  }
  onRemoveSize(topic: FormControl) {
    this.index = this.sizesArray.controls.indexOf(topic);
    if (this.category === 'Add Product') {
      this.sizesArray.removeAt(this.index);
      this.sizes.push(topic.value);
    } else if (this.category === 'Edit Product') {
      if (this.productAdd.indexOf(topic.value) != -1) {
        let membersAddIndex = this.productAdd.indexOf(topic.value);
      } else {
        this.productDelete.push(this.sizesArray.value[this.index]);
      }
      this.sizesArray.removeAt(this.index);
    }
    // this.sizes.push(topic.value);
  }
  onCreateProduct() {
    let productSize = this.storeForm.get('sizesArray').value;
    let productId = this.storeForm.get('productID').value;
    let productDescription = this.storeForm.get('productDescription').value;
    let productPrice = this.storeForm.get('price').value;
    let productName = this.storeForm.get('productName').value
    let productStatus = 'Available';
    let categoryId = this.storeForm.get('categoryId').value
    let subCategory = this.storeForm.get('subCategoryId').value
    let color = 'red';
    let productLength = this.sizesArray.value.length;
    if(this.category == 'Add Product') {
      if (productId != null) {
        this.mystoreService.addProduct(productId, color, productDescription, productName, productPrice, productStatus).subscribe((data: any) => {
          this.mystoreService.getProductList();
          if (categoryId != null) {
            this.mystoreService.addProductSubCategories(productId, subCategory).subscribe((data: any) => {
              if (data.status_code === 201) {
                this.mystoreService.getProductList();
              }
            })
          }
          if (productLength > 0) {
            for (let i = 0; i < productLength; i++) {
              this.mystoreService.addItems(productId, this.sizesArray.value[i].value).subscribe((data: any) => {
                if (data.status_code === 201) {
                  this.mystoreService.getProductList();
                }
              })
            }
          }
        })
      }
      this.dialogRef.close();
    } else if(this.category == 'Edit Product'){
      // console.log(productName)
      // console.log(productPrice)
      // console.log(productDescription)
      // console.log(productId)

      this.mystoreService.editProductPatch(productName, productPrice, productDescription, productId).subscribe((data: any) => { 
        this.mystoreService.getProductList();
      });
    }
  }
  get sizesArray() {
    return (<FormArray>this.storeForm.get('sizesArray'));
  }
  customValidationsprice(control: FormControl) {

  }
  customValidationsSizes(control: FormControl) {
    if (control.value) {
      this.floatingSizesEmpty = false;
      this.productSizeAlreadyAdded = false;
      let controlValue = control.value
      let controlValue1 = control.value.value
      if (this.category === "Edit Product") {
        if(controlValue != ''){
          let index = this.sizesArray.value.findIndex(item => item.value === controlValue1)
          if(index < 0) {
            this.floatingSizesEmpty = true;
            return { 'SizesNotAdded': true};
          }else {
            this.productSizeAlreadyAdded = true;
            this.floatingSizesEmpty = false;
            return { 'productSizeAlreadyAdded': true};
          }
          }
      }else if (this.category === "Add Product") {
        if(controlValue != ''){
        this.floatingSizesEmpty = true;
        return { 'SizesNotAdded': true };
        }
      }
      // let index = this.sizesArray.value.findIndex(item => item.value === controlValue1)
      // if(index < 0) {
      // this.floatingSizesEmpty = true;
      // console.log('mamamo')
      // } else {
      //   this.productSizeAlreadyAdded = true;
      //   this.floatingSizesEmpty = false;
      //   console.log('mamamoka')
      // }
      // console.log(this.storeForm.get('sizes').value,'wilbert')
      // if(this.storeForm.get('sizes').valid) {
      //   let index = this.sizes.value.findIndex(item => item.value === controlValue)
      //   if(index < 0) {
      //     this.floatingSizesEmpty = true;
      //   } else {
      //     this.productSizeAlreadyAdded = true;
      //   }
      // }
    }
  }
  customValidationsProductName(control: FormControl) {
    if (control.value) {
      let controlValue = control.value.trim().toLowerCase();

      if (!control.value.replace(/\s/g, '').length) {
        return { 'productNameSpacesOnlyEntered': true };
      }
      if (controlValue.length <= 3) {
        return { 'productNameTooShort': true };
      }
      let specialCharsOnly = /^[^a-zA-Z0-9]+$/;
      if (specialCharsOnly.test(controlValue)) {
        return { 'productNameAllSpecialChars': true };
      }
      if (controlValue.match(/^[0-9]+$/) != null) {
        return { 'productNameAllNumbers': true };
      }
      if(this.category == 'Edit Product') {
        if ((this.existingCategoryName.indexOf(controlValue) !== -1) && (controlValue != this.productTrimName)) {
          return { 'productNameAlreadyExists': true };
        }
      } else if(this.category == 'Add Product') {
        if(this.existingCategoryName.indexOf(controlValue) !== -1) {
          return { 'productNameAlreadyExists': true };
        }
      }
    }
    return null;
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  customValidationsProductId(control: AbstractControl) {
    if (control.value) {
      let controlValue = parseInt(control.value);
      // if (this.existingProductId.indexOf(controlValue) !== -1) {
      //   if (this.sizesArray.length > 0) {
      //     for (let i = -5; i <= this.sizesArray.length; i++) {
      //       this.sizesArray.removeAt(i);
      //     }
      //     this.mystoreService.getFloatingSizes();
      //   }
      //   return { 'productIdAlreadyExists': true };
      // }
      if (this.category == 'Edit Product') {
        if ((this.existingProductId.indexOf(controlValue) !== -1) && (controlValue !== this.productID)) {
          if (this.sizesArray.length > 0) {
            for (let i = -5; i <= this.sizesArray.length; i++) {
              this.sizesArray.removeAt(i);
            }
            this.mystoreService.getFloatingSizes();
          }
          return { 'productIdAlreadyExists': true };
        } else if (this.category == 'Add Product') {
          if (this.existingProductId.indexOf(controlValue) !== -1) {
            if (this.sizesArray.length > 0) {
              for (let i = -5; i <= this.sizesArray.length; i++) {
                this.sizesArray.removeAt(i);
              }
              this.mystoreService.getFloatingSizes();
            }
            return { 'productIdAlreadyExists': true };
          }
        }
      }
    }
  }
  // updateProduct(){
  //   this.mystoreService.editProductPatch( this.produtId).subscribe((data: any) => {

  //   });
  // }
  clearData() {
    this.subscription.unsubscribe();
  }
  alertConfirmationSaveProduct() {
    for (let i in this.storeForm.controls) {
      this.storeForm.controls[i].markAsTouched();
    }
    const swalWithBootstrapButtons = Swal.mixin({ buttonsStyling: false });
    // let modalQuestion;
    // if(this.category === "Edit Product") {
		// 	modalQuestion = 'Are you sure you want to update this Product?';
    // }else if(this.category === 'Add Product'){
    //   modalQuestion = 'Are you sure you want to create this new Product?';
    // }
    swalWithBootstrapButtons.fire({
      title: "Are you sure you want to save this squad?",
      text: "You won't be able to revert this.",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {


        // if(this.category ==='Edit Product') {
        //   modalMessage = 'Your Product has been updated.';
        //   // this.updateProduct();
        // } else if(this.category ==='Add Product') {
        //   this.onCreateProduct();
        // }

        swalWithBootstrapButtons.fire(
          'Success!',
          'Your product has been saved.',
          'success'
        )
        this.onCreateProduct();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }
}

