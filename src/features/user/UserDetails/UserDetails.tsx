import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import styles from "./UserDetails.module.scss";
import { Button, Form, Input, Row, Col } from "antd";
import { IUser } from "../../../types/user";
import { useAppDispatch } from "../../../app/hooks";
import { editUser } from "../userSlice";

type UserDetailsOptions = {
  user: IUser | undefined;
};

export const UserDetails = (props: UserDetailsOptions) => {
  const { user } = props;
  const [name, setName] = useState<string>(user?.name ?? "");
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [street, setStreet] = useState<string>(user?.address?.street ?? "");
  const [suite, setSuite] = useState<string>(user?.address?.suite ?? "");
  const [city, setCity] = useState<string>(user?.address?.city ?? "");
  const [zipcode, setZipcode] = useState<string>(user?.address?.zipcode ?? "");
  const [phone, setPhone] = useState<string>(user?.phone ?? "");
  const [website, setWebsite] = useState<string>(user?.website ?? "");
  const [companyName, setCompanyName] = useState<string>(
    user?.company?.name ?? ""
  );

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.resetFields();
  }, [user]);

  const onCancel = () => {
    form.resetFields();
    setIsChanged(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);

      const newUser: IUser = {
        id: user?.id ?? 0,
        name: name,
        username: username,
        email: email,
        address: {
          street: street,
          suite: suite,
          city: city,
          zipcode: zipcode,
          geo: {
            lat: user?.address.geo.lat ?? "",
            lng: user?.address.geo.lng ?? "",
          },
        },
        phone: phone,
        website: website,
        company: {
          name: companyName,
          catchPhrase: user?.company.catchPhrase ?? "",
          bs: user?.company.bs ?? "",
        },
      };

      dispatch(editUser(newUser));
      setIsChanged(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <Form
      className={styles.Form}
      form={form}
      labelCol={{
        span: 4,
      }}
      initialValues={{
        remember: true,
        ...user,
        street: user?.address?.street,
        suite: user?.address?.suite,
        city: user?.address?.city,
        zipcode: user?.address?.zipcode,
        companyName: user?.company?.name,
      }}
    >
      <Col flex={"auto"}>
        <Form.Item
          name="name"
          label="Name"
          labelCol={{
            span: 2,
          }}
        >
          <Input
            placeholder="Enter name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setIsChanged(true);
            }}
          />
        </Form.Item>
      </Col>
      <Row>
        <Col flex={"auto"}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
        <Col flex={"auto"}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Please enter valid email!" },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={"auto"}>
          <Form.Item
            name="street"
            label="Street"
            rules={[
              {
                required: true,
                message: "Please input your street!",
              },
            ]}
          >
            <Input
              placeholder="Enter street"
              value={street}
              onChange={(event) => {
                setStreet(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
        <Col flex={"auto"}>
          <Form.Item
            name="suite"
            label="Suite"
            rules={[
              {
                required: true,
                message: "Please input your suite!",
              },
            ]}
          >
            <Input
              placeholder="Enter suite"
              value={suite}
              onChange={(event) => {
                setSuite(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={"auto"}>
          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Input
              placeholder="Sofia"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
        <Col flex={"auto"}>
          <Form.Item name="zipcode" label="Zipcode">
            <Input
              placeholder="1700"
              value={zipcode}
              onChange={(event) => {
                setZipcode(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={"auto"}>
          <Form.Item name="phone" label="Phone" labelCol={{ span: 2 }}>
            <Input
              placeholder="+359876124500"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col flex={"auto"}>
          <Form.Item name="website" label="Website">
            <Input
              placeholder="https://redux-toolkit.js.org/"
              value={website}
              onChange={(event) => {
                setWebsite(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
        <Col flex={"auto"}>
          <Form.Item
            name="companyName"
            label="Company name"
            labelCol={{ span: 6 }}
          >
            <Input
              placeholder="Google"
              value={companyName}
              onChange={(event) => {
                setCompanyName(event.target.value);
                setIsChanged(true);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item
            wrapperCol={{
              offset: 24,
            }}
          >
            <Button type="primary" onClick={onSubmit} disabled={!isChanged}>
              Submit
            </Button>
          </Form.Item>
        </Col>
        <Form.Item
          wrapperCol={{
            offset: 24,
          }}
        >
          <Button
            className={styles.CancelButton}
            type="primary"
            onClick={onCancel}
            disabled={!isChanged}
          >
            Cancel
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
