import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEnvelope,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "./ContactDetails.scss";

const ContactDetails = (props) => {
  const navigate = useNavigate();

  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    fetchContactDetails(id);
  }, []);

  const fetchContactDetails = async (id) => {
    const response = await fetch(`http://localhost:3000/contacts/${id}`);
    const data = await response.json();
    setData(data);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="contact-details">
      <Row>
        <Col>
          <div className="contact-details-back" onClick={goBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="contact-details-general-icon"
            />
            Back
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="contact-details-general">
            <div className="contact-details-general-cover"></div>
            <div className="contact-details-general-main">
              <div className="contact-details-general-avatar">
                <img alt={data.name} src={data.photo} />
              </div>
              <div className="contact-details-general-name">{data.name}</div>
              <div className="contact-details-general-company">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="contact-details-general-icon"
                />
                {data.company}
              </div>
              <div className="contact-details-general-email">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="contact-details-general-icon"
                />
                {data.email}
              </div>
              <div>
                <Button variant="primary">Message</Button>{" "}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactDetails;
