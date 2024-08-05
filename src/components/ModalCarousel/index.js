import { Modal } from "react-bootstrap";
import { Carousel as ControlledCarousel } from '../Carousel'
import './ModalCarousel.scss'
function ModalCarousel(props) {
    return ( 
        <Modal
            {...props}
            size="md"
            dialogClassName="modal-100w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <ControlledCarousel 
                data = {props.images}
                state={props.indexState}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalCarousel;
