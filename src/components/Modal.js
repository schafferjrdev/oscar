import { Drawer as AntdDrawer, Input, Form, Button, Radio } from "antd";
import { addMovie } from "../db/firebase";

import { CloseOutlined } from "@ant-design/icons";
import Down from "../icons/Down";
import Icon from "./Icon";

function Modal({ movies, setMovies, open, onClose }) {
  const [form] = Form.useForm();

  const closeForm = () => {
    form.resetFields();
    onClose(false);
  };

  const onFinish = (values) => {
    const json = {
      movie: {
        imdb: `https://www.imdb.com/title/${values.imdb}/`,
      },
      platform: [
        {
          name: values.platform_name ?? "",
          url: values.url ?? "",
        },
      ],
      rate: 0,
      watched: false,
    };
    console.log("Success:", movies.length, json);
    addMovie(json, movies.length);
    closeForm();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AntdDrawer
      placement='bottom'
      onClose={closeForm}
      closable={false}
      open={open}
    >
      <div className='movie-details'>
        <div className='drawer-backdrop mobile'>
          <div className='modal-actions'>
            <h3>Adicione um filme novo</h3>
            <Down onClick={() => closeForm()} alt='Icon Caret Down' />
          </div>

          <div className='banner-information'>
            <Form
              className='form-layout'
              name='basic'
              form={form}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Form.Item
                name='imdb'
                rules={[
                  {
                    required: true,
                    message: "Coloque o id do IMDB",
                  },
                  {
                    pattern: /^tt\d{6,}$/,
                    message: "Use um ID válido (ex: tt1684562)",
                  },
                ]}
              >
                <Input
                  className='input'
                  placeholder='ID do IMDB (ex: tt1684562)'
                />
              </Form.Item>

              <h3 className='label-form'>Escolha onde ver</h3>
              <Form.Item
                name='platform_name'
                rules={[{ required: false, message: "Escolha uma plataforma" }]}
              >
                <Radio.Group
                  className='radio-group'
                  options={[
                    {
                      value: "netflix",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='netflix' />,
                    },
                    {
                      value: "prime",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='prime' />,
                    },
                    {
                      value: "hbo",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='hbo' />,
                    },
                    {
                      value: "disney",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='disney' />,
                    },
                    {
                      value: "crunchyroll",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='crunchyroll' />,
                    },
                    {
                      value: "apple",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='apple' />,
                    },
                    {
                      value: "mubi",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='mubi' />,
                    },
                    {
                      value: "globo",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='globo' />,
                    },
                    {
                      value: "stremio",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='stremio' />,
                    },
                    {
                      value: "ingresso",
                      className: "radio_item",
                      label: <Icon className='radio-icon' type='ingresso' />,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item name='url'>
                <Input
                  className='input'
                  bordered={false}
                  placeholder='Qual o link para ver?'
                />
              </Form.Item>
              <Button
                type='ghost'
                key='save'
                className='form-button'
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      console.log(values);
                      onFinish(values);
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
              >
                Salvar filme
              </Button>
            </Form>
          </div>
        </div>

        <div className='movie-banner desktop'>
          <div className='banner-backdrop'>
            <div className='banner-content'>
              <div className='banner-information'>
                <div className='float-buttons'>
                  <CloseOutlined
                    className='close-button round-button'
                    onClick={(e) => onClose(e)}
                  />
                </div>
                <Form
                  className='form-layout'
                  name='basic'
                  form={form}
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
                >
                  <Form.Item
                    name='imdb'
                    rules={[
                      {
                        required: true,
                        message: "Coloque o id do IMDB",
                      },
                      {
                        pattern: /^tt\d{6,}$/,
                        message: "Use um ID válido (ex: tt1684562)",
                      },
                    ]}
                  >
                    <Input
                      className='input'
                      placeholder='ID do IMDB (ex: tt1684562)'
                    />
                  </Form.Item>

                  <h3 className='label-form'>Escolha onde ver</h3>
                  <Form.Item
                    name='platform_name'
                    rules={[
                      { required: false, message: "Escolha uma plataforma" },
                    ]}
                  >
                    <Radio.Group
                      className='radio-group'
                      options={[
                        {
                          value: "netflix",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='netflix' />,
                        },
                        {
                          value: "prime",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='prime' />,
                        },
                        {
                          value: "hbo",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='hbo' />,
                        },
                        {
                          value: "disney",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='disney' />,
                        },
                        {
                          value: "crunchyroll",
                          className: "radio_item",
                          label: (
                            <Icon className='radio-icon' type='crunchyroll' />
                          ),
                        },
                        {
                          value: "apple",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='apple' />,
                        },
                        {
                          value: "mubi",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='mubi' />,
                        },
                        {
                          value: "globo",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='globo' />,
                        },
                        {
                          value: "stremio",
                          className: "radio_item",
                          label: <Icon className='radio-icon' type='stremio' />,
                        },
                        {
                          value: "ingresso",
                          className: "radio_item",
                          label: (
                            <Icon className='radio-icon' type='ingresso' />
                          ),
                        },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item name='url'>
                    <Input
                      className='input'
                      bordered={false}
                      placeholder='Qual o link para ver?'
                    />
                  </Form.Item>
                  <Button
                    type='ghost'
                    key='save'
                    className='form-button'
                    onClick={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          console.log(values);
                          onFinish(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                  >
                    Salvar filme
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AntdDrawer>
  );
}

export default Modal;
