import { Component, OnInit, EventEmitter } from '@angular/core';

// import {SearchService} from './../services/search.service';
import {SearchService} from './../services/mock_search.service';

import { ActivatedRoute, Params }     from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { User } from './../User';

@Component({
    selector: 'member-search',
    inputs: ['username', 'searchPattern'],
    outputs: ['userSelect'],
    templateUrl: './search.component.html',
    styleUrls: [
                    './../member.component.css',
                    './search.component.css'
                ]    
})
export class SearchComponent implements OnInit{

    public username: string;
    public searchPattern: string;

    public userSelect: EventEmitter<string> = new EventEmitter();

    _selectUser(name: string): void{
        console.log('selected '+name);
        this.userSelect.next(name);
    }

    userGroups: User[][];

    constructor(private searchService: SearchService,
                private route: ActivatedRoute){ }

    ngOnInit(): void {
        // this.route.params
        // .switchMap(function(params: Params){
        //     return this.searchService.search(params["pattern"]);     
        // }.bind(this))
        this.searchService.search(this.searchPattern) 
        .then(function(users: User[]){
            this.userGroups = this._toGrid(users,3);
        }.bind(this))   
    }

    _toGrid(items: any[], nCols: number){
        let grid = [];
        const max=nCols*Math.ceil(items.length/nCols);
        for(let idx=0; idx<max; idx+=nCols){
            grid.push(items.slice(idx, idx+nCols))
        }
        return grid;
    }
}