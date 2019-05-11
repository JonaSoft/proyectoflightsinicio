import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item'

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
   @Input() archivos:FileItem[]=[]
   @Output() mouseSobre: EventEmitter<boolean>= new EventEmitter;

  constructor() { }
   // eventos
   @HostListener('dragover',['$event'])
   public onDragEnter(event: any){
      this.mouseSobre.emit(true);
      this._prevenirDetener( event );
   }
   @HostListener('dragleave',['$event'])
   public onDragLeave(event:any){
      this.mouseSobre.emit(false);
   }
   // arrastro y solto
   @HostListener('drop',['$event'])
   public onDrop(event:any){

      const transferencia = this._getTransferencia( event );
      if (!transferencia){
         return;
      }
      this._extraerArchivos( transferencia.files );
      this._prevenirDetener(event);
      this.mouseSobre.emit(false);
   }
   private _getTransferencia( event: any ){
      return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
   }
   private _extraerArchivos( archivosLista: FileList ){
      console.log(archivosLista);
   }

   //Validaciones
   private archivoListoCargar(archivo: File):boolean{
      if (!this.archivoDroppeado( archivo.name ) && this._esImagen(archivo.type)){
         return true;
      }else{
         return false;
      }
   }

   private _prevenirDetener(event){
      event.preventDefault();
      event.stopPropagation();
   }
   private archivoDroppeado(nombreArchivo:string): boolean{
      for( const archivo of this.archivos){
         if (archivo.nombreArchivo == nombreArchivo){
            console.log('el archivo es'+nombreArchivo+' ya esta agregado');
            return true;
         }
      }
      return false;
   }
   //validar archivo tipo texto o imagen
   private _esImagen( tipoArchivo: string ): boolean {
      // retorna falso si el tipo de archivo es vacio o indefinido
      // 2da condicion evalua si es una imagen o texto
      return ( tipoArchivo ==='' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('texto');
   }
}
