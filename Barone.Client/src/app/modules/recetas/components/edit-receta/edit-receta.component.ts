import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DBOperation } from 'src/app/core/enum/enum.enum';
import { RecetaModel } from 'src/app/modules/shared/models/receta/receta.model';
import { RecetasService } from '../../services/recetas.service';
import { SnackManagerService, SelectItem } from 'src/app/core/core.module.export';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { MaltaModel } from 'src/app/modules/shared/models/receta/malta.model';
import { TipoIngrediente, IncludeConstants } from 'src/app/modules/shared/enum/enums';
import { LupuloModel } from 'src/app/modules/shared/models/receta/lupulo.model';
import { AguaModel } from 'src/app/modules/shared/models/receta/agua.model';
import { AdjuntosModel } from 'src/app/modules/shared/models/receta/adjuntos.model';
import { InsumosService } from 'src/app/modules/insumos/services/insumos.service';
import { InsumoModel } from 'src/app/modules/shared/models/insumo.model';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ElementDef } from '@angular/core/src/view';
import { EstilosModel } from 'src/app/modules/shared/models/estilos.model';
import { EstilosService } from 'src/app/modules/estilos/services/estilos.service';

@Component({
  selector: 'app-edit-receta',
  templateUrl: './edit-receta.component.html',
  styleUrls: ['./edit-receta.component.scss']
})
@IncludeConstants()
export class EditRecetaComponent implements OnInit {
  msg: string;
  indLoading: boolean = false;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  listFilter: string;
  selectedOption: string;
  receta: RecetaModel;
  insumos: InsumoModel[];
  estilos: EstilosModel[] = [];
  estilosSelect: SelectItem[] = [];
  //itemInsumos: SelectItem[] = [];
  malta: MaltaModel;
  agua: AguaModel;
  //Form Agua
  displayedAguaColumns: string[] = ['TipoAgua', 'Cantidad'];
  dataSourceAgua: MatTableDataSource<AguaModel>;
  public AguaForm: FormGroup;
  get aguaArray() {
    return this.AguaForm.get('aguaArray') as FormArray;
  }
  //Form Adjunto

  displayedAdjuntoColumns: string[] = ['Insumo', 'Cantidad', 'Tiempo'];
  dataSourceAdjunto: MatTableDataSource<AdjuntosModel>;
  public AdjuntoForm: FormGroup;
  get adjuntoArray() {
    return this.AdjuntoForm.get('adjuntoArray') as FormArray;
  }

  ///Form Malta
  displayedMaltaColumns: string[] = ['Insumo', 'Cantidad', 'Porcentaje'];
  dataSourceMalta: MatTableDataSource<MaltaModel>;
  public MaltaForm: FormGroup;
  get maltaArray() {
    return this.MaltaForm.get('maltaArray') as FormArray;
  }

  ///Form Lupulo
  displayedLupuloColumns: string[] = ['Insumo', 'PorcentajeAA', 'Tiempo', 'IBUS'];
  dataSourceLupulo: MatTableDataSource<LupuloModel>;
  public lupuloForm: FormGroup;
  get lupuloArray() {
    return this.lupuloForm.get('lupuloArray') as FormArray;
  }


  constructor(private recetasServices: RecetasService,
    public _formBuilder: FormBuilder,
    private _snack: SnackManagerService,
    private insumosServices: InsumosService,
    private estiloServices: EstilosService,
    public dialogRef: MatDialogRef<EditRecetaComponent>) {

  }


  ngOnInit() {
    if (typeof (this.receta) == "undefined") {
      this.receta = new RecetaModel();
      this.receta.MaltaReceta = [];
      this.receta.LupuloReceta = [];
      this.receta.AdjuntoReceta = [];
      this.receta.AguaReceta = [];
      this.agua = new AguaModel();
      this.malta = new MaltaModel();
    }


    this.insumosServices.getAll().subscribe(insumos => {
      this.insumos = insumos;
      this.dataSourceAgua = new MatTableDataSource(this.receta.AguaReceta);
      this.dataSourceLupulo = new MatTableDataSource(this.receta.LupuloReceta);
      this.dataSourceAdjunto = new MatTableDataSource(this.receta.AdjuntoReceta);
      this.dataSourceMalta = new MatTableDataSource(this.receta.MaltaReceta);
    });
    ////Init Form Agua

    this.AguaForm = this._formBuilder.group({
      TipoAgua: new FormControl(''),
      Cantidad: new FormControl(''),
      aguaArray: this._formBuilder.array(this.receta.AguaReceta.map(o => new FormGroup({
        TipoAgua: new FormControl(o.TipoAgua),
        Cantidad: new FormControl(o.Cantidad)
      })))//this._formBuilder.array([])
    });
    ///Init Form Adjunto
    this.AdjuntoForm = this._formBuilder.group({
      Insumo: new FormControl(''),
      Cantidad: new FormControl(''),
      Tiempo: new FormControl(''),
      adjuntoArray: this._formBuilder.array(this.receta.AdjuntoReceta.map(o => new FormGroup({
        Insumo: new FormControl(o.Insumo),
        Cantidad: new FormControl(o.Cantidad),
        Tiempo: new FormControl(o.Tiempo)
      })))
      //this._formBuilder.array([])
    });

    ///Init Form Malta
    this.MaltaForm = this._formBuilder.group({
      Insumo: new FormControl(''),
      Cantidad: new FormControl(''),
      Porcentaje: new FormControl(''),
      maltaArray: this._formBuilder.array(this.receta.MaltaReceta.map(o => new FormGroup({
        Insumo: new FormControl(o.Insumo),
        Cantidad: new FormControl(o.Cantidad),
        Porcentaje: new FormControl(o.Porcentaje)
      })))
      //this._formBuilder.array([])
    });


    ///Init Form Lupulo
    this.lupuloForm = this._formBuilder.group({
      Insumo: new FormControl(''),
      PorcentajeAA: new FormControl(''),
      Tiempo: new FormControl(''),
      IBUS: new FormControl(''),
      lupuloArray: this._formBuilder.array(this.receta.LupuloReceta.map(o => new FormGroup({
        Insumo: new FormControl(o.Insumo.id),
        PorcentajeAA: new FormControl(o.PorcentajeAA),
        Tiempo: new FormControl(o.Tiempo),
        IBUS: new FormControl(o.IBUS)
      })))

      //this._formBuilder.array([])
    });


    this.loadEstilos();



  }
  public loadEstilos() {
    this.estiloServices.getAll().subscribe(estilos => {
      this.estilos = estilos;
    })
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.Nombre === f2.Nombre;
  }
  onSubmit() {
    switch (this.dbops) {
      case DBOperation.create:
        this.receta.Malta = JSON.stringify(this.receta.MaltaReceta);
        this.receta.Lupulo = JSON.stringify(this.receta.LupuloReceta);
        this.receta.Agua = JSON.stringify(this.receta.AguaReceta);
        this.receta.Adjunto = JSON.stringify(this.receta.AdjuntoReceta);
        this.recetasServices.insert(this.receta).subscribe((result) => {
          this.receta.id = result.id;
          this.dialogRef.close("success");
          this._snack.openSnackBar("Receta Creada Exitosamente", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.update:
        this.receta.Malta = JSON.stringify(this.receta.MaltaReceta);
        this.receta.Lupulo = JSON.stringify(this.receta.LupuloReceta);
        this.receta.Agua = JSON.stringify(this.receta.AguaReceta);
        this.receta.Adjunto = JSON.stringify(this.receta.AdjuntoReceta);
        this.recetasServices.update(this.receta).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Receta Actualizada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;
      case DBOperation.delete:

        this.recetasServices.delete(this.receta.id).subscribe(() => {
          this.dialogRef.close("success");
          this._snack.openSnackBar("Receta Eliminada", 'Success');

        }, error => {
          this._snack.openSnackBar(error, 'Error');
          this.dialogRef.close("error");

        });

        break;

    }
  }
  public HayMalta() {
    return this.receta.MaltaReceta.length > 0;
  }
  public HayLupulos() {
    return this.receta.LupuloReceta.length > 0;
  }
  public HayAgua() {
    return this.receta.AguaReceta.length > 0;

  }
  public HayAdjunto() {
    return this.receta.AdjuntoReceta.length > 0;

  }
  public addRow(type: TipoIngrediente) {
    switch (type) {
      case TipoIngrediente.Malta:

        this.maltaArray.push(this._formBuilder.group({
          Insumo: '',
          Cantidad: 0,
          Porcentaje: ''
        }));
        this.receta.MaltaReceta.push(new MaltaModel());
        this.dataSourceMalta = new MatTableDataSource(this.receta.MaltaReceta);

        // this.receta.MaltaReceta.push(this.malta);
        // this.malta = new MaltaModel();
        break;
      case TipoIngrediente.Lupulo:

        this.lupuloArray.push(this._formBuilder.group({
          Insumo: '',
          PorcentajeAA: 0,
          Tiempo: '',
          IBUS: '',
        }));
        this.receta.LupuloReceta.push(new LupuloModel());
        this.dataSourceLupulo = new MatTableDataSource(this.receta.LupuloReceta);


        //  this.receta.LupuloReceta.push(new LupuloModel());
        break;
      case TipoIngrediente.Agua:
        this.aguaArray.push(this._formBuilder.group({
          TipoAgua: '',
          Cantidad: 0
        }));
        this.receta.AguaReceta.push(new AguaModel());
        this.dataSourceAgua = new MatTableDataSource(this.receta.AguaReceta);


        //  this.agua = new AguaModel();
        break;
      case TipoIngrediente.Adjunto:

        this.adjuntoArray.push(this._formBuilder.group({
          Insumo: '',
          Cantidad: 0,
          Tiempo: ''
        }));
        this.receta.AdjuntoReceta.push(new AdjuntosModel());
        this.dataSourceAdjunto = new MatTableDataSource(this.receta.AdjuntoReceta);


        // this.receta.AdjuntoReceta.push(new AdjuntosModel());
        break;

      default:
        break;
    }
  }
  public test() {



  }
  public addMalta() {

  }


}