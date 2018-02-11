import {Component, Input, ContentChildren, QueryList, AfterViewInit} from '@angular/core';
import {LayoutProcessor} from './sort';
import {TileComponent} from '../tile/tile.component';

@Component({
    selector: 'tile-group',
    templateUrl: './tile.group.component.html',
    host: {
        '[class]': '_class'
    }
})
export class TileGroupComponent implements AfterViewInit {
    @Input()
    title: 'title';

    @ContentChildren(TileComponent) tileArray: QueryList<TileComponent>;

    ngAfterViewInit() {
        this._childrenNum = this.tileArray.length;
        this._setSize((new LayoutProcessor(this.tileArray.toArray())).groupWidth);
    }

    private _size = 'double';
    private _childrenNum = 0;
    _class = '';

    _setSize(size: number) {
        switch (size) {
            case 2:
                this._size = 'one';
                break;
            case 4:
                this._size = 'double';
                break;
            case 6:
                this._size = 'three';
                break;
            case 8:
                this._size = 'four';
                break;
        }
        setTimeout(() => {
            this._setClass();
        });

    }

    _setClass(): void {
        this._class = ['tile-group ', this._size, this._childrenNum ? '' : 'no-children'].join(' ');
    }


}



