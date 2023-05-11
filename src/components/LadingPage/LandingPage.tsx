// Components
import { Box, Button, Typography, Divider } from "@mui/material";
import welcomeImg from "../../styles/img/welcome.png";
import Circle from "../../styles/img/Circle.png";
import IC1 from "../../styles/img/IC1.png";
import IC2 from "../../styles/img/IC2.png";
import IC3 from "../../styles/img/IC3.png";
import IC4 from "../../styles/img/IC4.png";
import IC5 from "../../styles/img/IC5.png";
import IC6 from "../../styles/img/IC6.png";
import Patterns from "../../styles/img/Patterns.png";

const LandingPage = () => {
  return (
    <>
      <section id="hero" className="welcome">
        <Box className="Title">
          <Typography variant="h1" fontWeight={700} sx={{ mb: 2 }}>
            Parquea sin preocupaciones
          </Typography>
          <Typography
            variant="h6"
            fontWeight={400}
            color="error.main"
            sx={{ mb: 2 }}
          >
            Nuestros parqueaderos te ofrecen la tranquilidad que necesitas en tu
            día a día
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Agendar
          </Button>
        </Box>
        <Box className="Carr">
          <img className="circle" src={Circle} alt="Circle Blue" />
          <img className="car" src={welcomeImg} alt="Welcome image" />
        </Box>
      </section>
      <Box
        className="services"
        sx={{
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
        }}
      >
        <Box className="titles">
          <h2>Únete a miles de clientes satisfechos</h2>
          <p>
            Nuestro servicio de parqueaderos ofrece una experiencia única y
            confiable para los conductores en Colombia
          </p>
        </Box>
        <Box
          className="clients"
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
            }}
          >
            <img src={Patterns} alt="patterns-parkud" />
          </Box>
          <div className="percent">
            <Typography variant="h3">100+</Typography>
            <p>Ubicaciones</p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="percent">
            <h3>24/7</h3>
            <p>Para hospitales</p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="percent">
            <h3>95%</h3>
            <p>Satisfacción</p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="percent">
            <h3>50.000+</h3>
            <p>Conductores registrados</p>
          </div>
        </Box>
      </Box>
      <Box className="characteristic">
        <Box className="title">
          <h2>Características a medida</h2>
          <p>
            Conoce las características clave de nuestro sistema de parqueaderos
            inteligente
          </p>
        </Box>
        <Box className="items">
          <div className="item">
            <img className="IC" src={IC1} alt="ic1" />
            <h4>Autenticación segura</h4>
            <p>
              Protege tu información con nuestra autenticación segura de
              usuario.
            </p>
          </div>
          <div className="item">
            <img className="IC" src={IC2} alt="ic2" />
            <h4>Transparencia de precios</h4>
            <p>
              Conoce de manera clara y detallada el costo de los productos o
              servicios que deseas adquirir.
            </p>
          </div>
          <div className="item">
            <img className="IC" src={IC3} alt="ic3" />
            <h4>Personalización de la experiencia</h4>
            <p>
              Ofrecer opciones de personalización: elección del tipo de
              estacionamiento y la ubicación preferida.Ofrecer opciones de
              personalización: elección del tipo de estacionamiento y la
              ubicación preferida.
            </p>
          </div>
          <div className="item">
            <img className="IC" src={IC4} alt="ic4" />
            <h4>Programas de fidelización</h4>
            <p>
              Acumula puntos, descuentos y beneficios por el uso frecuente del
              sistema.
            </p>
          </div>
          <div className="item">
            <img className="IC" src={IC5} alt="ic5" />
            <h4>Feedback</h4>
            <p>
              Danos tu opinión para poder mejorar el servicio y ofrecer una
              experiencia de estacionamiento cada vez mejor.
            </p>
          </div>
          <div className="item">
            <img className="IC" src={IC6} alt="ic6" />
            <h4>Seguridad y privacidad</h4>
            <p>
              Garantizamos la protección de los datos personales y bancarios de
              los clientes, así como la seguridad de sus vehículos mientras
              estén estacionados.
            </p>
          </div>
        </Box>
      </Box>
    </>
  );
};

export { LandingPage };
