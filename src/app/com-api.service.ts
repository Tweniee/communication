import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComAPIService {
  public BASE_URL = 'https://gorest.co.in/public/v2/users';
  constructor(public http: HttpClient) {}

  getUser() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.BASE_URL)
        .toPromise()
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  updateUser(userData: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(this.BASE_URL + '/' + userData.id, userData)
        .toPromise()
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  deleteUser(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.BASE_URL + '/' + id)
        .toPromise()
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createUser(userData: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.BASE_URL, userData)
        .toPromise()
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
