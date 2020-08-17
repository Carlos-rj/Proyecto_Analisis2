import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../Servicios/global.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public global: GlobalService) { }

  ngOnInit() {
    if (this.global.usuario === null){
      this.router.navigate([`/`]);
    }
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
