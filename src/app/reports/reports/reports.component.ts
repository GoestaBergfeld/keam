import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Relation, Node, NodeService, RelationService } from '@shared/entities';

import * as go from 'gojs';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  nodes: Node[];
  relations: Relation[];

  private diagram: go.Diagram = new go.Diagram();
  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  constructor(
    private nodeService: NodeService,
    private relationService: RelationService
  ) {
    const $ = go.GraphObject.make;
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape,
        {
          fill: 'white', strokeWidth: 0,
          portId: '', cursor: 'pointer',
          // allow many kinds of links
          fromLinkable: true, toLinkable: true,
          fromLinkableSelfNode: true, toLinkableSelfNode: true,
          fromLinkableDuplicates: true, toLinkableDuplicates: true
        },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding('text').makeTwoWay())
    );
  }

  private prepareDiagram() {
    // if (this.nodes && this.relations) {
      const nodes = [];
      const relations = [];
      this.nodes.forEach(node => {
        nodes.push({
          key: node.Id,
          text: node.Name,
          color: 'grey'
        });
      });
      this.relations.forEach(relation => {
        relations.push({
          from: relation.StartNodeId,
          to: relation.EndNodeId
        });
      });
      const model = new go.GraphLinksModel(nodes, relations);
      this.diagram.model = model;
    // }
  }

  ngOnInit(): void {
    this.diagram.div = this.diagramRef.nativeElement;
    this.nodeService.getAll();
    this.relationService.getAll();
    combineLatest(this.nodeService.collection$, this.relationService.collection$).subscribe(data => {
      if (data[0] && data[1]) {
        this.nodes = data[0];
        this.relations = data[1];
        this.prepareDiagram();
      }
    });
  }

}
