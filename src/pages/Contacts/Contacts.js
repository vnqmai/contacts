import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import Table from "../../components/Table/Table";
import Pagination from "../../components/Pagination/Pagination";
import "./Contacts.scss";

const Contatcs = () => {
  let navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1, key = "") => {
    const response = await fetch(
      `http://localhost:3000/contacts?_limit=10&_page=${page}&name_like=${key}`
    );
    const data = await response.json();
    const formatedData = data.map((item) => ({
      ...item,
      photo: (
        <img
          className="contacts-item-avatar"
          alt={item.name}
          src={item.photo}
        />
      ),
    }));
    setContacts(formatedData);

    const docs = Number.parseInt(response.headers.get("X-Total-Count") || "0");
    setTotalDocs(docs);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const onSearchKeyChange = (e) => {
    const key = e.target.value;
    setSearchKey(key);
    fetchData(currentPage, key);
  };

  const debounceOnSearchKeyChange = debounce(onSearchKeyChange, 500);

  const handleSearch = (e) => {
    debounceOnSearchKeyChange(e);
  };

  const goToDetails = (id) => {
    navigate(`/contacts/${id}`);
  };

  return (
    <Container className="contacts-container">
      <Row>
        <Col>
          <div className="contacts-filter">
            <FormGroup className="form-group">
              <Form.Control
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon1"
                onChange={handleSearch}
              />
            </FormGroup>
          </div>
          <div className="seperator"></div>
          <div className="contacts-table">
            <Table
              fields={[
                {
                  name: "photo",
                  label: "",
                  className: "photo",
                },
                {
                  name: "name",
                  label: "Name",
                  className: "name",
                },
                {
                  name: "email",
                  label: "Email",
                  className: "email",
                },
              ]}
              items={contacts}
              itemClassName={"contacts-item"}
              onItemClick={goToDetails}
            />
          </div>
          <div className="contacts-pagination">
            <Pagination
              totalDocs={totalDocs}
              docsPerpage={10}
              onSelect={onPageChange}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contatcs;
