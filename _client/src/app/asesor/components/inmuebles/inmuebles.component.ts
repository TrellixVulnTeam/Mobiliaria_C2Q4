import { Component, OnInit } from '@angular/core';
import { inmuebleI } from 'src/app/models/inmuebles';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.scss']
})
export class InmueblesComponent implements OnInit {

  inmuebles: inmuebleI[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
