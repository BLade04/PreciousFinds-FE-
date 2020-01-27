import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

const API_URL_MYSTORE = environment.apiUrl + '/mystore';

@Injectable({
  providedIn: 'root'
})

export class MyStoreService extends ApiService implements OnDestroy {
  private myStoreTableListener = new Subject();
  private floatingSizes: Subscription;
  private getFloatingSizesListenerList = new Subject<any>();
  private allCategoriesListener = new Subject();
  private subAllCategoriesListener = new Subject();
  private sameSizeProductListener = new Subject();
  private productDetailsListener = new Subject();
  private productSizeListener = new Subject();
  private productCategoryListener = new Subject();
  productList;
  sizeList;
  category;
  subCategory;
  sameSize;

  constructor(private http: HttpClient) {
    super();
  }
  getProductList() {
    this.http.get(API_URL_MYSTORE + '/list').subscribe((response) => {
      this.productList = response;
      this.myStoreTableListener.next(this.productList);
    });
  }


  getCategories() {
    this.http.get(API_URL_MYSTORE + '/category/dropdown')
      .subscribe((response) => {
        this.category = response;
        this.allCategoriesListener.next(this.category);
      });
  }
  addProduct(productId, productColor, productDesciption, productName, productPrice, productStatus) {
    const newProduct: any = {
      id: productId,
      color: productColor,
      description: productDesciption,
      name: productName,
      price: productPrice,
      status: productStatus,
    };
    return this.http.post(this.API_URL_MYSTORE + '/addproduct', newProduct);
  }
  addItems(productId, productSize) {
    const newProduct: any = {
      product_id: productId,
      size_id: productSize
    };
    return this.http.post(this.API_URL_MYSTORE + '/additems', newProduct);
  }
  addProductSubCategories(productId, productSubCategory) {
    const newProduct: any = {
      product_id: productId,
      subcategories_id: productSubCategory
    };
    return this.http.post(this.API_URL_MYSTORE + '/addproductsubcategories', newProduct);
  }

  getProductDetails(productId: number) {
    this.http.get(API_URL_MYSTORE + '/getProductDetails?id=' + productId)
      .subscribe((response) => {
        this.sameSize = response;
        this.productDetailsListener.next(this.sameSize);
      });
  }
  getProductSizeDetails(productId: number) {
    this.http.get(API_URL_MYSTORE + '/getSizeDetails?product_id=' + productId)
      .subscribe((response) => {
        this.sameSize = response;
        this.productSizeListener.next(this.sameSize);
      });
  }
  getCategoryDetails(productId: number) {
    this.http.get(API_URL_MYSTORE + '/getCategoryDetails?product_id=' + productId)
      .subscribe((response) => {
        this.sameSize = response;
        this.productCategoryListener.next(this.sameSize);
      });
  }

  getProductSameSize(productId: number, sizeId: number) {
    this.http.get(API_URL_MYSTORE + '/getProductSameSize?product_id=' + productId + '&size_id=' + sizeId)
      .subscribe((response) => {
        this.sameSize = response;
        this.sameSizeProductListener.next(this.sameSize);
      });
  }
  editProductPatch(productName, productPrice, productDescription, productId) {
    const postData: any = { 
      name: productName, 
      price: productPrice,
      description: productDescription,
      id: productId
    };

    return this.http.patch(this.API_URL_MYSTORE + '/editProduct', postData);

  }
  // editTribeLeadPatch(name, tribeId) {
  //   const postData: any = { name: name , tribeId: tribeId};
  //   // const postData: any = { name: name};
  //   console.log(postData);
  //   console.log(tribeId);
  //   return this.http.patch(this.API_URL_TRIBES + '/tribeName?tribe_id=' + tribeId, postData);
  //   console.log("==== Tribe Name Data Editing");
  // }



  getSubByCategory(category_id: number) {
    this.http.get(API_URL_MYSTORE + '/getSubByCategory?category_id=' + category_id)
      .subscribe((response) => {
        this.subCategory = response;
        this.subAllCategoriesListener.next(this.subCategory);
      });
  }
  getFloatingSizes() {
    this.http.get(API_URL_MYSTORE + '/types/dropdown').subscribe((response) => {
      this.sizeList = response;
      this.getFloatingSizesListenerList.next(this.sizeList);
    });
  }
  getProductsCategoryListener() {
    return this.productCategoryListener.asObservable();
  }
  getProductsSizeListener() {
    return this.productSizeListener.asObservable();
  }
  getProductDetailsListener() {
    return this.productDetailsListener.asObservable();
  }
  getSameSizeProductListner() {
    return this.sameSizeProductListener.asObservable();
  }
  getSubCategoriesListener() {
    return this.subAllCategoriesListener.asObservable();
  }
  getCategoriesListener() {
    return this.allCategoriesListener.asObservable();
  }

  getProductListListener() {
    return this.myStoreTableListener.asObservable();
  }
  getFloatingSizesListener() {
    return this.getFloatingSizesListenerList.asObservable();
  }

  ngOnDestroy() {
    // this.http.get(this.API_URL_DASHBOARD +'/')
    this.subscription.unsubscribe();
  }

}