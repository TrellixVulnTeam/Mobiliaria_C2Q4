import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	datos: any = {};
	rol: any = this.cookie.get('ROL');
	context: any = [];
	Profile: any;
	classImg: string = '';
	constructor(
		private profileS: ProfileService,
		private toast: ToastrService,
		private cookie: CookieService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.obtenerProfile();
	}

	obtenerProfile() {
		switch (this.rol) {
			case 'ASESOR':
			this.profileS.getData(false).subscribe(
					(data) => {
						this.datos = data.user;
						this.context = data.context;
					},
					(err) => { }
				);
				break;
			case 'SECURITY':
				this.profileS.getData(false).subscribe(
					(data) => {
						this.datos = data.user;
						this.context = data.context;

					},
					(err) => { }
				);
				break;

			case 'CLIENT':
				this.profileS.getData(false).subscribe(
					(data) => {
						console.log('-------__>',data)
						this.datos = data.user;
						this.profileS.getFavorites(data.user.id).subscribe(
							(favs) => {
								console.log('------>', favs);
								this.context = favs;
							},
							(error) => {
								Swal.fire(error.name, error.message);
							}
						);
					}, 
					(error) => { 
						Swal.fire(error.name, error.message, 'error')
					}
				);
				break;
		}
	}

	changeImg(event: any) {
		if (!this.Profile) {
			if (event.target.width > event.target.height) {
				this.classImg = `transform: scale(1.2)`;
			} else if (event.target.width <= event.target.height) {
				this.classImg = 'width: 15rem;';
			}
		}
	}
}
