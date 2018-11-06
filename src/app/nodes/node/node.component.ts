import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Node } from '@shared/entities';


@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  node: Node;

  constructor(
  ) {}

  ngOnInit() {
  }
}
