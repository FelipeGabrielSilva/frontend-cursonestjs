import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { Categoria } from "../interface/categoria";
import categoriaService from "../service/categoria.service";
import { Link } from "react-router-dom";

const CrudCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[] | []>([]);
  const [modalVisibilidade, setModalVisibilidade] = useState(false);
  const [editandoCategoria, setEditandoCategoria] =
    useState<Categoria | null>();
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    setCategorias(await categoriaService.getAll());
  };

  const handleSave = async (values: Categoria) => {
    if (editandoCategoria)
      await categoriaService.update(editandoCategoria.id, values);
    else await categoriaService.create(values);
    setModalVisibilidade(false);
    setEditandoCategoria(null);
    loadCategorias();
    clearForm();
  };

  const handleDelete = async (id: number) => {
    await categoriaService.delete(id);
    loadCategorias();
  };

  const clearForm = () => {
    form.setFieldValue("nome", "");
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
          Adicionar Categoria
        </Button>

        <Link to="/produtos">
          <Button>Produto</Button>
        </Link>
      </div>

      <Table
        dataSource={categorias}
        columns={[
          { title: "Nome", dataIndex: "nome" },
          {
            title: "Ações",
            render: (_, record) => (
              <>
                <Button
                  onClick={() => {
                    setEditandoCategoria(record);
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
        </Form>
      </Modal>
    </div>
  );
};

export default CrudCategorias;
