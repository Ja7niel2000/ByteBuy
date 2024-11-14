import Swal from "sweetalert2";


export class SwalMessages{

    // muestra mensaje de confirmación
    successMessage(message: string){
        if(message==null){message ="No se pudo conectar con la base de datos."}
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            background: '#E8F8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
   
    // muestra mensaje de error
    errorMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
    confirmMessage = Swal.mixin({
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: `Cancelar`,
        confirmButtonText: "Confirmar",
        customClass: {
            title: 'swal-title',
            icon: 'swal-icon',
            confirmButton: 'btn btn-primary swal-confirm-button',
            cancelButton: 'btn btn-danger swal-cancel-button',
        },
    });
}
