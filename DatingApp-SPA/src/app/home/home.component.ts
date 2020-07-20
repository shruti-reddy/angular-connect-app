import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { typeWithParameters } from "@angular/compiler/src/render3/util";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isRegisterClicked = false;
  values: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getValues();
  }

  registerToggle() {
    this.isRegisterClicked = true;
  }

  // getValues() {
  //   this.http.get("http://localhost:5000/api/values").subscribe(
  //     (response) => {
  //       this.values = response;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  cancelRegisterMode(registermode: boolean) {
    this.isRegisterClicked = registermode;
  }
}
