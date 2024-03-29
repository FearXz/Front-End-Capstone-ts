import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginPost } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../../interfaces/interfaces";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    const loginObj: LoginDto = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginPost(loginObj, navigate));

    console.log(data);
  }

  return (
    <Col xs={12} md={6} className="login-form py-7">
      <Row>
        <Col className=" offset-lg-1  col-lg-10 col-12 text-center">
          <h2 className="h1 font-breef">
            Accedi{" "}
            <a href="#col-registration-form" className="d-md-none d-inline text-success text-decoration-none">
              {" "}
              o Registrati
            </a>
          </h2>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
            <Row>
              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingEmailLogin" label="Email*" className="mb-3">
                  <Form.Control
                    {...register("email", {
                      required: `L'Email è obbligatoria`,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Formato Email non valido ",
                      },
                    })}
                    className="rounded-0 focus"
                    type="email"
                    placeholder="name@example.com"
                  />
                  {errors?.email?.message && <p className="text-danger">{errors.email.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingPasswordLogin" label="Password*">
                  <Form.Control
                    {...register("password", { required: true })}
                    className="rounded-0 focus"
                    type="password"
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-danger">Non hai inserito la password</p>}
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center pt-6">
                <Button
                  type="submit"
                  className="rounded-0 btn btn-leaf-500 text-white button-border-success fw-semibold"
                >
                  ACCEDI
                </Button>
                <span className="d-lg-inline-block d-block px-2 py-lg-0 py-2 ">oppure</span>
                <Button className="rounded-0 btn btn-warning text-white  button-border-warning  fw-semibold">
                  RESETTA PASSWORD
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default LoginForm;
