class Props {
    message: string = "¿Esta seguro de que quiere Borrar?";
    onDeleteConfirm = () => { };
}

export default function DeleteModal(props:Props) {
    return (
        <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Borrar Transferencia</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-primary" onClick={props.onDeleteConfirm}>Si</button>
                    </div>
                </div>
            </div>
        </div>
    );
}