import React from 'react'
import { Card, CardBody, Col, Row } from "reactstrap";
import { H3, H5, Image } from "../../../AbstractElements";
import { dynamicImage } from '../../../Service';

const Other_Wallet = (props:any) => { 
  return (
        <>
        <Col md="4" className='col-12'>
          <Card className="client-card card-hover boxshadow">
            <CardBody>
              <Row>
                <Col xs="8" className="custom-width-1">
                  <H5 className='font-secondary'>Airdrop Wallet</H5>
                  <H5 className="f-w-600 font-seeGreen">{props.airdrop} FXST</H5>
                </Col>
                <Col xs="4" className="custom-width-2">
                  <div >
                   <Image src={dynamicImage('airdrop_wallet.png')} style={{width:'60px'}} alt='airdrop'/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className='col-12 px-md-3 ' md="4">
          <Card className="client-card card-hover boxshadow">
            <CardBody>
              <Row>
                <Col xs="8" className="custom-width-1">
                  <H5 className='font-primary'>Gift Token Wallet</H5>
                  <H5 className="f-w-600 font-seeGreen">{props.gitwallet} FXST</H5>
                </Col>
                <Col xs="4" className="custom-width-2">
                  <div >
                   <Image src={dynamicImage('giftToken_Wallet.png')} style={{width:'60px'}} alt='airdrop'/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className='col-12'>
          <Card className="client-card card-hover boxshadow">
            <CardBody>
              <Row>
                <Col xs="8" className="custom-width-1">
                  <H5 className='font-secondary' >Bonanza Wallet</H5>
                  <H5 className="f-w-600 font-seeGreen">${props.bonanza}</H5>
                </Col>
                <Col xs="4" className="custom-width-2">
                  <div >
                  <Image src={dynamicImage('Bonanza_Wallet.png')} style={{width:'60px'}} alt='airdrop'/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        </>

  )
}

export default Other_Wallet