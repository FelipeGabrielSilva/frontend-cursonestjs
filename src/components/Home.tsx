import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title>Seja bem-vindo ao curso de NestJS</Title>
      
      <Row gutter={16}>
        <Col span={12}>
          <Link to="/categorias">
            <Card title="CRUD de Categorias">
              Gerencie as categorias do seu sistema.
            </Card>
          </Link>
        </Col>
      
        <Col span={12}>
          <Link to="/produtos">
            <Card title="CRUD de Produtos">
              Gerencie os produtos do seu sistema.
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
