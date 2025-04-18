import { MotiView } from "moti";
import { styled } from "nativewind";
import { Image, Text, View } from "react-native";
import NavBar from "../components/NavBar";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const AnimatedView = styled(MotiView);

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
};

export default function Profile() {
  return (
    <StyledView className="flex-1 bg-[#EBEBEB]">
      {/* Encabezado animado */}
      <AnimatedView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={[
          shadowStyle,
          {
            backgroundColor: "white",
            padding: 16,
            borderRadius: 10,
            margin: 10,
            alignItems: "center",
          },
        ]}
      >
        <StyledImage
          source={{ uri: "https://i.pravatar.cc/141" }} // Avatar de prueba
          className="w-24 h-24 rounded-full mb-3"
        />
        <StyledText className="text-3xl font-bold">Tu Perfil</StyledText>
        <StyledText className="text-gray-400 text-lg">Estudiante</StyledText>
      </AnimatedView>

      {/* Información del usuario */}
      <StyledView className="mt-4 px-3">
        <AnimatedView
          from={{ opacity: 0, translateX: -20, scale: 0.9 }}
          animate={{ opacity: 1, translateX: 0, scale: 1 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <StyledText className="text-xl font-bold">Información</StyledText>
        </AnimatedView>

        <AnimatedView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 200 }}
          style={[
            shadowStyle,
            {
              backgroundColor: "white",
              padding: 16,
              borderRadius: 10,
              marginTop: 10,
            },
          ]}
        >
          <StyledText className="text-gray-600">
            📧 Correo: estudiante@email.com
          </StyledText>
          <StyledText className="text-gray-600 mt-1">
            🎯 Nivel: Avanzado
          </StyledText>
          <StyledText className="text-gray-600 mt-1">
            📆 Miembro desde: 2024
          </StyledText>
        </AnimatedView>
      </StyledView>

      {/* Barra de navegación */}
      <NavBar />
    </StyledView>
  );
}
