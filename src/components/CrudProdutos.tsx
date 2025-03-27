import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Categoria } from "../interface/categoria";
import { Produto } from "../interface/produto";
import categoriaService from "../service/categoria.service";
import produtoService from "../service/produto.service";

const CrudProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[] | []>([]);
  const [modalVisibilidade, setModalVisibilidade] = useState(false);
  const [editandoProduto, setEditandoProduto] = useState<Produto | null>(null);
  const [form] = Form.useForm();
  const [categorias, setCategorias] = useState<Categoria[] | []>([]);

  useEffect(() => {
    loadProdutos();
    loadCategorias();
  }, []);

  const loadProdutos = async () => {
    setProdutos(await produtoService.getAll());
  };

  const loadCategorias = async () => {
    const categoriasData = await categoriaService.getAll();
    setCategorias(categoriasData);
  };

  const handleSave = async (values: Produto) => {
    if (editandoProduto)
      await produtoService.update(editandoProduto.id, values);
    else await produtoService.create(values);
    setModalVisibilidade(false);
    setEditandoProduto(null);
    loadProdutos();
    clearForm();
    console.log(JSON.stringify(values));
  };

  const handleDelete = async (id: number) => {
    await produtoService.delete(id);
    loadProdutos();
  };

  const clearForm = () => {
    form.setFieldsValue("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => setModalVisibilidade(true)}>
          Adicionar Produto
        </Button>

        <Link to="/categorias">
          <Button>Categoria</Button>
        </Link>
      </div>

      <Table
        dataSource={produtos}
        columns={[
          { title: "Nome", dataIndex: "nome" },
          { title: "Descrição", dataIndex: "descricao" },
          {
            title: "Categoria",
            dataIndex: "categoria",
            render: (categoria) => categoria.nome,
          },
          /* { title: "Categoria", dataIndex: "categoria" }, */
          { title: "Preço", dataIndex: "preco" },
          {
            title: "Ações",
            render: (_, record) => (
              <>
                <Button
                  onClick={() => {
                    setEditandoProduto(record);
                    form.setFieldsValue(record);
                    setModalVisibilidade(true);
                  }}
                >
                  Editar
                </Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Excluir
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
      />

      <Modal
        open={modalVisibilidade}
        onCancel={() => setModalVisibilidade(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="descricao" label="Descrição">
            <Input />
          </Form.Item>

          <Form.Item name="preco" label="Preço" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          {/* <Form.Item name="categoria" label="Categoria">
            <Input />
          </Form.Item> */}

          <Form.Item name="categoriaID" label="Categoria">
            <Select style={{ width: "100%" }}>
              {categorias.map((categoria) => (
                <Select.Option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrudProdutos;
