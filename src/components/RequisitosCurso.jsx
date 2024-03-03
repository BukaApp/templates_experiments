import React, { JSX } from "react";
import maskgroup from "../assets/mask-group.jpg";
import "./requsitos-curso.css";
import LogoMaiorWhiteComponent from "../assets/LogoMaiorWhiteComponent";
import HorizontalLinearStepper from "./internalComponents/Stepper";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import { Link } from "@mui/material";

const steps = ["Pagamento", "Criar conta", "Aderir"];

const RequisitosCurso = () => {
  const paymentTypeList = ["A ordem", "corrente", "global"];
  const quantiaAPagar = ["15000", "30000", "25000"];
  const valorMinimo = 15000;
  const gap = 1.5;
  const padding = "2rem";
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  /**
   *
   * @param {number | string} digits
   * @return number | string
   */
  const formatDigits = (digits) => {
    // esta funcao foi construindo assumindo que o limite dos valores encontram-se apenas
    // na casa das centenas

    const param = digits.toString();
    const lastDigits = param.slice(-3);

    if (param && eval(`${param} > 999`)) {
      if (param.length % 2 === 0) {
        const firstdigits = param.slice(0, lastDigits.length - 2);
        return `${firstdigits}.${lastDigits},00`;
      }

      const firstdigits = param.slice(0, lastDigits.length - 1);
      return `${firstdigits}.${lastDigits},00`;
    }
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [typePayment, setTypePayment] = React.useState("");
  const [countToPay, setCountToPay] = React.useState("");

  const handleChangeTypePayment = (event) => {
    setTypePayment(event.target.value);
  };
  const handleChangeCountToPay = (event) => {
    setCountToPay(event.target.value);
  };

  /**
   *
   * @returns JSX.Element
   */
  const ButtonBaseProgress = () => {
    return (
      <Box sx={{ display: "flex", mt: "35px", gap }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="btn-progress"
        >
          Cancelar
        </Button>

        {/* {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )} */}

        <Button onClick={handleNext} className="btn-progress">
          {activeStep === steps.length - 1 ? "Terminar" : "Continuar"}
        </Button>
      </Box>
    );
  };

  /**
   *
   * @param {number} step
   * @returns JSX.Element
   */
  const ListComponent = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "grid",
              gridAutoFlow: "row",
              gap,
            }}
          >
            <TextField fullWidth label="Nome de quem pagou" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de pagamento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typePayment}
                label="Tipo de pagamento"
                onChange={handleChangeTypePayment}
              >
                {paymentTypeList.map((paymentType) => (
                  <MenuItem value={paymentType} key={uuid()}>
                    {paymentType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Quantia a pagar
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={countToPay}
                  label="Quantia a pagar"
                  onChange={handleChangeCountToPay}
                >
                  {quantiaAPagar.map((quantia) => (
                    <MenuItem value={quantia} key={uuid()}>
                      {quantia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" className="d-flex">
                <Typography
                  variant="caption"
                  style={{
                    color: "var(--black)",
                    fontSize: "0.925rem",
                  }}
                >
                  Valor mínimo a pagar:{" "}
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    color: "var(--primary)",
                    fontSize: "0.925rem",
                  }}
                >
                  {formatDigits(valorMinimo)}kzs
                </Typography>
              </Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "grid",
              gridAutoFlow: "row",
              gap,
            }}
          >
            <TextField
              label="Número de transição/operação"
              variant="outlined"
              type="number"
            />
            <Box sx={{ display: "flex", alignItems: "center", gap }}>
              <TextField
                variant="outlined"
                type="date"
                className="input-date"
              />
              <TextField
                variant="outlined"
                type="time"
                className="input-date"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Quantia a pagar
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={countToPay}
                  label="Quantia a pagar"
                  onChange={handleChangeCountToPay}
                >
                  {quantiaAPagar.map((quantia) => (
                    <MenuItem value={quantia} key={uuid()}>
                      {quantia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" className="d-flex">
                  <Typography
                    variant="caption"
                    style={{
                      color: "var(--black)",
                      fontSize: "0.925rem",
                    }}
                  >
                    Valor mínimo a pagar:{" "}
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.925rem",
                    }}
                  >
                    {formatDigits(valorMinimo)}kzs
                  </Typography>
                </Typography>
                <Link
                  href="tel:+244900000000"
                  underline="none"
                  style={{ color: "var(--black)" }}
                >
                  Ajuda
                </Link>
              </Box>
            </Box>
          </Box>
        );
      default:
        break;
    }
  };

  return (
    <div className="container-requisitoscurso flex">
      <div className="container-literal-painel-requisitoscurso">
        <div className="container-logo-requisitoscurso flex">
          <LogoMaiorWhiteComponent size={90} />
        </div>
        <div className="container-image-requisitoscurso flex">
          <div className="subcontainer-maskgroup flex">
            <img
              src={maskgroup}
              alt="Imagem"
              className="image-maskgroup-requistoscurso"
            />
          </div>
        </div>
      </div>
      <div className="container-form-payment">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 0,
          }}
        >
          <Stepper activeStep={activeStep} sx={{ px: padding, mt: padding }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              // if (isStepOptional(index)) {
              //     labelProps.optional = (
              //         <Typography variant="caption">Optional</Typography>
              //     );
              // }

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps} className="circle-parent">
                    {null}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep !== steps.length && (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding,
                  gap: "2.5rem",
                }}
              >
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <Box>
                  <Typography
                    sx={{ color: "var(--primary)", fontWeight: "600" }}
                    variant="h5"
                  >
                    Pagamentos
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      width: "calc(100% - 125px)",
                      m: "auto",
                      color: "var(--black)",
                      fontSize: "0.725rem",
                    }}
                  >
                    Para poder participar da formação efectue o pagamento e
                    assim confirme a sua presença nesta turma.
                  </Typography>
                </Box>
                <Box>
                  <ListComponent step={activeStep} />
                  {/*  */}
                  <ButtonBaseProgress />
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
};

export default RequisitosCurso;
