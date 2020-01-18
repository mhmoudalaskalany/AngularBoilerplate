import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: 'delete-modal.component.html',
    styleUrls: [],
})
export class DeleteDialogComponent implements OnInit {

    constructor(public ref: DynamicDialogRef) { }

    ngOnInit(): void {
    }
    onNoClick(): void {
        this.ref.close( { data : false});
    }

    onYesClick(): void {
        this.ref.close({ data: true });
    }
}

export interface DialogData {
    id: string;
}
