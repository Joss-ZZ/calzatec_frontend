import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TypeForm } from '@calzatec/shared/utils/form';
import { LoginAuthDto } from '@calzatec/shared/models/login-auth.dto';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '@calzatec/shared/services/auth.service';
import { CookiesService } from '@calzatec/core/service/cookies/cookies.service';
import { KEY } from '@calzatec/shared/utils/constants';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule
  ]
})
export class LoginComponent {
  formGroup = this._formBuilder.group<TypeForm<LoginAuthDto>>({
    username: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  rememberFormControl = this._formBuilder.control(false);

  visible = signal(false);
  inputType = computed(() => {
    return this.visible() ? 'password' : 'text';
  });

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _cookiesService: CookiesService,
    private readonly _router: Router,
    private readonly snackbar: MatSnackBar
  ) {}

  send() {
    this._router.navigate(['/']);
    this.snackbar.open(
      "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
      'THANKS',
      {
        duration: 10000
      }
    );
  }

  toggleVisibility() {
    this.visible.update((v) => !v);
  }

  async signIn(): Promise<void> {
    if (!this.formGroup.valid) return;

    const authDto = this.formGroup.getRawValue();

    const result = await firstValueFrom(this._authService.login(authDto));

    console.log({ result });

    this._cookiesService.setItem(KEY.token, result.token);

    this._router.navigate(['/']);
  }
}
