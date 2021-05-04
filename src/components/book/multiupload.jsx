import React, { Component } from 'react'
import axios from 'axios'
import { Card, Form, Container, InputGroup, FormControl , Button , Modal , Row ,Col, Carousel} from 'react-bootstrap';
import DatePicker from 'react-datepicker'
class EditEmployeeEngagement extends Component {

    state = {
        employeeEngagement: {},
        id: String,
        engagementName: String,
        notes: String,
        engagementDate: new Date(),
        openModal : false,
        imageRef : [],
        imgSrc : String,
    }

    changeHandler = (event) => {
        console.log(event.target.value);
        
        this.setState({ [event.target.name]: event.target.value })

    }

    dateChangeHandler = (date) => {

        this.setState({ engagementDate: date })

    }

    openModal = () => this.setState({openModal : true})

    closeModal = ()=>{this.setState({openModal : false})}

    fileSelect = (event) => {

        var reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {

                //this.setState({ imgSrc: reader.result })
                let img = reader.result.split(',')[1];
                console.log(img);
                
                //this.setState({imgSrc : img})
                this.setState({ imageRef: [...this.state.imageRef, img] })
                console.log(this.state.imageRef);

            }

           
            reader.onerror = () => {
                reader.abort()
                reject(new DOMException("problem parsing input file"))
            };
            reader.readAsDataURL(event.target.files[0]);
            
        })

    }

    submitForm = (e)=>{
        e.preventDefault()
        let employeeEngagement = {
            "id": this.state.id,
            "engagementName": this.state.engagementName,
            "engagementDate": null,
            "notes": this.state.notes,
             "image": null
           
        }

        let formData = new FormData();
        formData.append("employeeEngagement",JSON.stringify(employeeEngagement))

        for(let i in this.state.imageRef){
            formData.append("files",this.state.imageRef[i])
        }

        axios.put(`http://localhost:9000/api/NewsLetter/emplpoyeeEngagements/${this.state.id}`,formData).then((res)=>{
            console.log("success");
            
        })
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        let id = this.props.match.params.id;
        axios.get(`http://localhost:9000/api/NewsLetter/employeeEngagements/${id}`).then((res) => {
            //  console.log(res.data);
            this.setState({ employeeEngagement: res.data })
            this.setState({id: res.data.id})
            this.setState({engagementName: res.data.engagementName})
            this.setState({notes: res.data.notes})
            for(let i in res.data.image.imagefiles){
                let image = res.data.image.imagefiles[i].data;
                this.setState({imageRef :[... this.state.imageRef,image]})
            }
            
        })
    }

    deleteImage = (index)=>{
        console.log("index");
        
        let imageArray  = [...this.state.imageRef]
        imageArray.splice(index,1);
        this.setState({imageRef:imageArray})
    }
    render() {

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="id">
                                <Form.Label>Event Id </Form.Label>
                                <Col lg={4} md={6} sm={6} xs={12}>
                                <Form.Control type="text" name="id" onChange={this.changeHandler} value={this.state.id}></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="engagementName" className="mt-2">
                                <Form.Label>Event Name </Form.Label>
                                <Col lg={4} md={6} sm={6} xs={12}>
                                <Form.Control type="text" name="engagementName" value={this.state.engagementName} onChange={this.changeHandler}></Form.Control>
                                </Col>
                            </Form.Group>


                            <InputGroup className="mt-2" >
                                <Form.Label>Engagement Notes  </Form.Label>
                                <FormControl as="textarea" name="notes" rows="5" value={this.state.notes} onChange={this.changeHandler} />
                            </InputGroup>
                            <Form.Group controlId="engagementDate" className="mt-2">
                                <Form.Label>Engagement Date</Form.Label>

                                <DatePicker
                                    selected={this.state.engagementDate}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    onChange={this.dateChangeHandler}
                                />


                            </Form.Group>

                            <Button variant="primary" onClick={this.openModal}>Select Images</Button>

                            <Modal show={this.state.openModal} onHide={this.closeModal}>
                                <Modal.Header closeButton >
                                    <Modal.Title>Selelct Image</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <input enctype="multipart/form-data" type="file" multiple onChange={this.fileSelect} />
                                    {
                                        
                                        (this.state.imageRef.length)? (
                                            this.state.imageRef.map((img,index)=>(
                                                            <div key={index}> 
                                                            <Card.Img className="img" src={`data:image/jpeg;base64,${img}`}></Card.Img>
                                                             <Button onClick = {()=>this.deleteImage(index)} variant="light">Remove</Button>
                                                            </div>
                                                        
                                                    
                                                    ))
                                        )
                                            : null
                                    }



                                </Modal.Body>
                            </Modal>
                        <Button variant="primary" onClick={this.submitForm} >Save</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

}
export default EditEmployeeEngagement;