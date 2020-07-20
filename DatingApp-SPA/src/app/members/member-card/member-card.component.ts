import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../_models/user";
import { UserService } from "src/app/_services/user.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  likeUser(id: number) {
    this.userService.sendLike(this.authService.currentUser.id, id).subscribe(
      (data) => {
        this.alertify.success("You liked the " + this.user.knownAs);
      },
      (error) => {
        this.alertify.error("Failed to like the user");
      }
    );
  }
}
