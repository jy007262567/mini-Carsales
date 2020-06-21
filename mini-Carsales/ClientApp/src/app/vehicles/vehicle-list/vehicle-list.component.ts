import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Observable, Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { VehicleService } from 'src/app/services/vehicle.service';

import { VehicleView } from 'src/app/services/data-types/common.types';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit, OnDestroy {

  @ViewChild('DetailTemplate') modal: TemplateRef<any>;
  @ViewChild('ConfirmTemplate') ConfirmModal: TemplateRef<any>;

  modalRef: BsModalRef;

  public vehicles$: Observable<VehicleView[]>;
  public vehicles: VehicleView[] = [];
  public vehicleDetail: VehicleView;

  private getvehicleDetail_: Subscription
  vehicleId:number;

  userRoleStatus: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  constructor(private vehicleservice: VehicleService,
    private modalService: BsModalService,
    private chRef: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.vehicles$ = this.vehicleservice.getVehicles();

    this.vehicles$.subscribe(result => {

      this.vehicles = result;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    });

  }

  createNew(): void {

    this.onSelect(1);
  }
  onSelect(id: number): void {

    if (this.getvehicleDetail_) {
      this.getvehicleDetail_.unsubscribe();
      this.getvehicleDetail_ = null;
    }


    this.getvehicleDetail_ = this.vehicleservice.getvehicleDetail(id).subscribe(result => {

      this.vehicleDetail = result;
      console.log(result);

      this.modalRef = this.modalService.show(this.modal);

    });


  }

  onDelete(id: number): void {


    this.modalRef = this.modalService.show(this.ConfirmModal);

    this.vehicleId=id;

  }
  confirmDelete(){
    this.modalRef.hide();
    this.vehicleservice.deleteVehicle(this.vehicleId).subscribe(result => {
      
      this.vehicleservice.getVehicles().subscribe(result => {

        this.vehicles = result;
        
        this.rerender();
      });
    })

  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      dtInstance.destroy();

      this.dtTrigger.next();

    });

  }
}
