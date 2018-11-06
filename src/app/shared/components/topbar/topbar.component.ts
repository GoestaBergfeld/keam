
import { Component, OnInit } from '@angular/core';
import { NodeTypeEnum } from '@shared/enums';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  nodeTypes = NodeTypeEnum;

  ngOnInit(): void {}

}
