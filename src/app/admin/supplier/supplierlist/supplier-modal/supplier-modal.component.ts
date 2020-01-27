import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, ControlContainer } from "@angular/forms";
import { Subscription } from 'rxjs';
import { supplierListSerivce } from 'src/app/service/supplier-list.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
  styleUrls: ['./supplier-modal.component.scss']
})
export class SupplierModalComponent implements OnInit {
  subscription: Subscription;
  @Input() category: String;
  @Input() supplierId;
  showView: Boolean = false;
  showCreate: Boolean = false;
  showEdit: Boolean = false;
  fieldDisabled: Boolean = false;
  fieldDisabledone: Boolean = false;
  resetSquadsArray: Boolean = false;
  isView: Boolean;
  storeForm: FormGroup;
  supplierName;
  contact_number;
  location;  
  email;
  existingSupplierId = [];
  private control: AbstractControl;
  index;

  constructor(private dialog: MatDialog,
    public diaglogRef: MatDialogRef<SupplierModalComponent>,
    private supplierListSerivce: supplierListSerivce,
    ) { }

    ngOnInit() {
      this.supplierListSerivce.getSupplierList();
      
      
      this.supplierListSerivce.getSupplierListListener().subscribe((data:any) => {
        let allSuppllier = data.data
        this.existingSupplierId = [];
      
        for (let key of allSuppllier) {
          this.existingSupplierId.push(key.supplierId);
        }
      })

      this.isView = this.category == 'View' ? true : false;
      if (this.category === 'View' || this.category === "View Supplier") {
        this.viewSupplier();
  
      } else if (this.category == "Create") {
        this.category = "Add Supplier"
        this.fieldDisabled = false;
        this.isView = false;
      }
      this.initializeReactiveForms();
    }
    viewSupplier() {
      if (this.category == 'Edit Supplier') {
        this.isView = true;
        Object.keys(this.storeForm.controls).forEach(key => {
          this.storeForm.get(key).disable();
        });
      }
      this.fieldDisabled = true;
      this.isView = true;
      this.category = "View Supplier";

      if (this.category !== "Edit Supplier") { this.loadSupplierFormDetails(); }
     
    }
    close() {
      this.dialog.closeAll();
    }
    loadSupplierFormDetails() {
      this.supplierListSerivce.getSupplierDetails(this.supplierId)
      this.supplierListSerivce.getSupplierDetailsListener().subscribe((data: any) => {
        let supplierDetails = data.data;
        this.supplierId = supplierDetails[0].supplierId;
        this.supplierName = supplierDetails[0].name;
        this.contact_number = supplierDetails[0].contactNumber;
        this.email = supplierDetails[0].email;
        this.location = supplierDetails[0].address;
     
        this.storeForm.patchValue({
          supplierId: this.supplierId,
          supplierName: this.supplierName,
          contact_number: this.contact_number,
          email: this.email,
          location: this.location,

        });
      });
    }
    
    initializeReactiveForms() {
      this.storeForm = new FormGroup({
        supplierId: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required, this.customValidationsSupplierId.bind(this)]),
        supplierName: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required, this.customValidationsSupplierName.bind(this)]),
        contact_number: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required]),
        email: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required]),
        location: new FormControl({ value: null, disabled: this.fieldDisabled }, [Validators.required])
      });
    }
    

      onCreateSupplier() {
        let supplierId = this.storeForm.get('supplierId').value;
        let supplierName = this.storeForm.get('supplierName').value;
        let email = this.storeForm.get('email').value;
        let contact_number = this.storeForm.get('contact_number').value;
        let location = this.storeForm.get('location').value;
        console.log(supplierId)
        console.log(supplierName)
        console.log(email)
        console.log(location)
        console.log(contact_number)
         if (supplierId != null) {
           this.supplierListSerivce.createSupplier(supplierId, supplierName, contact_number, email, location).subscribe((data: any) => {
             if (data.data != undefined) {
               this.supplierListSerivce.getSupplierList();
             }
              if (data.status_code === 201) { }
           })
      
         }
    }

    customValidationsSupplierId(control: AbstractControl) {
      if (control.value) {
        let controlValue11 = control.value.trim().toLowerCase();
        let controlValue = parseInt(control.value.trim());
        if (this.existingSupplierId.indexOf(controlValue) !== -1) {
         
          } 
      }
    }

    customValidationsSupplierName(control: FormControl) {
      if (control.value) {
        let controlValue = control.value.trim().toLowerCase();
  
        if (!control.value.replace(/\s/g, '').length) {
          return { 'supplierNameSpacesOnlyEntered': true };
        }
        if (controlValue.length <= 3) {
          return { 'supplierNameTooShort': true };
        }
        let specialCharsOnly = /^[^a-zA-Z0-9]+$/;
        if (specialCharsOnly.test(controlValue)) {
          return { 'supplierNameAllSpecialChars': true };
        }
        if (controlValue.match(/^[0-9]+$/) != null) {
          return { 'supplierNameAllNumbers': true };
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
    
    clearData() {
      this.subscription.unsubscribe();
    } 

alertConfirmationSavesupplier() {
  for (let i in this.storeForm.controls) {
    this.storeForm.controls[i].markAsTouched();
  }
  const swalWithBootstrapButtons = Swal.mixin({ buttonsStyling: false });
  let modalQuestion;
  modalQuestion = 'Are you sure you want to create this new supplier?';
  swalWithBootstrapButtons.fire({
    title: modalQuestion,
    text: '',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      let modalMessage;
      modalMessage = 'Your supplier has been created.';
      this.onCreateSupplier();

      swalWithBootstrapButtons.fire(
        'Success!',
        modalMessage,
        'success'
      )
      this.storeForm.reset();
    } else if (result.dismiss === Swal.DismissReason.cancel) {

    }
  });
}}



