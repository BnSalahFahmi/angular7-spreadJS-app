import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from '../../../shared/services/global.service';
import { menuService } from '../../../shared/services/menu.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Store, select } from '@ngrx/store';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent, ITreeState } from 'angular-tree-component';
import { mockTransaction } from '../../../transaction-manager/models/transaction.model';
import * as fromUsers from '../../../transaction-manager/store/index';
import * as transactionTabsActions from '../../../transaction-manager/store/transactionTabs.actions';
import { UserService } from '../../../transaction-manager/services/user.service';
import * as _ from 'lodash';
import { TreeService } from '../../services/tree.service';

@Component({
  selector: 'transactions-tree-view',
  templateUrl: './transactions-tree-view.component.html',
  styleUrls: ['./transactions-tree-view.component.scss']
})
export class TransactionsTreeViewComponent implements OnInit {

  @ViewChild('tree') tree: TreeComponent;

  contextMenu: { node: TreeNode, x: number, y: number } = null;
  sourceNode: TreeNode = null;
  editNode: TreeNode = null;
  doCut = false;
  nodes : any[] = [];
  customTemplateStringOptions: ITreeOptions = {
    isExpandedField: 'expanded',
    idField: 'id',
    useCheckbox: false,
    getChildren: this.getChildren.bind(this),
    actionMapping: {
      mouse: {
        contextMenu: (treeModel: TreeModel, treeNode: TreeNode, e: MouseEvent) => {
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
          this.closeMenu();
          e.shiftKey
              ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(treeModel, treeNode, e)
              : TREE_ACTIONS.TOGGLE_ACTIVE(treeModel, treeNode, e)
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


  constructor(private store: Store<fromRoot.State>, private _treeService: TreeService, private userService : UserService) {
    this._treeService.filterSubject.subscribe(
      (query) => {
        if(query != undefined)
          this.filterNodes(query);
      }
    )
  }

  ngOnInit() {
    this.store.pipe(select(fromUsers.selectUsersList)).subscribe(
      data => {
        this.nodes = _.cloneDeep(data);
      }
    )
  }

  get state() {
    return localStorage.treeState && JSON.parse(localStorage.treeState);
  }
  set state(state) {
    localStorage.treeState = JSON.stringify(state);
  }

  getChildren(node: TreeNode) {
    var newNodes = [];
    this.userService.getUser(100).subscribe((data) => {
      newNodes = data.map((c) => Object.assign({}, c));
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(newNodes), 1000);
    });
  }

  addNode(tree: any) {
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `${node.children.length}` : '';
  }

  filterNodes(text: string) {
    this.tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  onEvent(event: any) {
    console.log(event);
  }

  onInitialized(tree) {
    // if (localStorage.treeState) {
    //   tree.treeModel.setState(JSON.parse(localStorage.treeState));
    // }
    // this.state(tree.treeModel.state);
  }

  go($event: any) {
    $event.stopPropagation();
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }

  closeMenu = () => {
    this.contextMenu = null;
  }

  remove = () => {
    var node = this.contextMenu.node;
    if (node.parent != null) {
        node.parent.children.splice(node.index, 1)
        //node.treeModel.update();
        this.closeMenu();
    }
}

  stopEdit = () => {
    this.editNode = null;
  }

  copy = () => {
    debugger;
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

  onSort(direction, node) {
    debugger;
    if(!node)
      return;
    if (direction == 'Asc') {
      node.data.children.sort(function (child1, child2) {
        if (child1.name < child2.name) {
          return -1;
        } else if (child1.name > child2.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      node.data.children.sort(function (child1, child2) {
        if (child1.name < child2.name) {
          return 1;
        } else if (child1.name > child2.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    this.tree.treeModel.update();
  }

  onStateChange(event){
    //TODO
  }
}
