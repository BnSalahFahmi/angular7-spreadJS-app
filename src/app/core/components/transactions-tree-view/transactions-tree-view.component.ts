import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { menuService } from '../../../shared/services/menu.service';
import { Observable, BehaviorSubject } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { mockTransaction } from '../../../transaction-manager/models/transaction.model';
import * as fromTransactionTabs from '../../../transaction-manager/store/index';
import * as transactionTabsActions from '../../../transaction-manager/store/transactionTabs.actions';
import * as transactionActions from '../../../transaction-manager/store/transaction.actions';

@Component({
  selector: 'transactions-tree-view',
  templateUrl: './transactions-tree-view.component.html',
  styleUrls: ['./transactions-tree-view.component.scss']
})
export class TransactionsTreeViewComponent implements OnInit {

  contextMenu: { node: TreeNode, x: number, y: number } = null;
  sourceNode: TreeNode = null;
  editNode: TreeNode = null;
  doCut = false;
  nodes: any[];
  asyncChildren = new Array(4).fill(null).map((item, n) => ({
    name: 'async child2.' + n,
    subTitle: 'async child ' + n,
    hasChildren: n < 5
  }));
  customTemplateStringOptions: ITreeOptions = {
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping: {
      mouse: {
        contextMenu: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
          debugger;
          e.preventDefault();
          if (this.contextMenu && treeNode === this.contextMenu.node) {
            return this.closeMenu();
          }
          this.contextMenu = {
            node: treeNode,
            x: e.pageX,
            y: e.pageY
          };
        },
        dblClick: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
          if (treeNode.hasChildren) {
            TREE_ACTIONS.TOGGLE_EXPANDED(treeModel, treeNode, e);
          } else {
            this.delegateOpenTabDetails(treeNode, e);
          }
        },
        click: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
          // $event.shiftKey
          //     ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
          //     : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event)
          this.closeMenu();
          TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
      }
    },
    nodeHeight: 25,
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    allowDragoverStyling: true,
    //levelPadding: 5,
    scrollOnActivate: true,
    //animateSpeed: 30,
    animateAcceleration: 1.2
  };


  constructor(private store: Store<fromRoot.State>, private _menuService: menuService,
    public _globalService: GlobalService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {
          expanded: true,
          name: 'root expanded',
          subTitle: 'the root',
          children: [
            {
              name: 'child 1',
              subTitle: 'a bad child',
              hasChildren: false
            },
            {
              name: 'child 2',
              subTitle: 'a bad child',
              hasChildren: false
            }
          ]
        },
        {
          name: 'root2',
          subTitle: 'the second root',
          children: [
            {
              name: 'child2.1',
              subTitle: 'new and improved',
              uuid: '11',
              hasChildren: false
            }, {
              name: 'child2.2',
              subTitle: 'new and improved2',
              children: [
                {
                  uuid: 1001,
                  name: 'subsub',
                  subTitle: 'subsub',
                  hasChildren: false
                }
              ]
            }
          ]
        },
        {
          name: 'asyncroot',
          hasChildren: true
        }
      ];
    }, 1);
  }

  getChildren(node: TreeNode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 2000);
    });
  }

  addNode(tree: any) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    debugger;
    return node && node.children ? `${node.children.length}` : '';
  }

  filterNodes(text: string, tree: any) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  onEvent(event: any) {
    console.log(event);
  }

  onInitialized(tree: any) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event: any) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }

  closeMenu = () => {
    this.contextMenu = null;
  }

  remove = () => {
    this.editNode = this.contextMenu.node;
    this.contextMenu.node.parent.data.children.splice(0, 1)
    this.closeMenu();
  }

  stopEdit = () => {
    this.editNode = null;
  }

  copy = () => {
    this.sourceNode = this.contextMenu.node;
    this.doCut = false;
    this.closeMenu();
  }

  cut = () => {
    this.sourceNode = this.contextMenu.node;
    this.doCut = true;
    this.closeMenu();
  }

  paste = () => {
    if (!this.canPaste()) {
      return;
    }
    this.doCut
      ? this.sourceNode.treeModel.moveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 })
      : this.sourceNode.treeModel.copyNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });

    this.sourceNode = null;
    this.closeMenu();
  }

  canPaste = () => {
    if (!this.sourceNode) {
      return false;
    }
    return this.sourceNode.treeModel.canMoveNode(this.sourceNode, { parent: this.contextMenu.node, index: 0 });
  }

  delegateOpenTabDetails(tab: any, event?: Event) {
    debugger;
    let transaction = mockTransaction();
    this.store.dispatch(new transactionTabsActions.OpenTabAction({
      type: 0,
      tab: {
        id: this.uuid(),
        type: "TRANSACTION",
        heading: tab.data.name,
        active: true,
        closable: true,
        transaction: transaction
      }
    }));
  }

  uuid() {
    return Math.floor(Math.random() * 10000000000000);
  }

}
