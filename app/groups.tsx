import { Text, View } from "react-native";
import { styled } from "nativewind";
import { MotiView } from "moti";
import NavBar from "../components/NavBar";

const StyledView = styled(View);
const StyledText = styled(Text);
const AnimatedView = styled(MotiView);

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
};

export default function Groups() {
  const groupList = [
    { name: "Grupo de Física", lastActivity: "Hace 2 horas", color: "#2563eb" },
    {
      name: "Grupo de Matemáticas",
      lastActivity: "Hace 30 minutos",
      color: "#dc2626",
    },
  ];

  return (
    <StyledView className="flex-1 bg-[#EBEBEB] py-3">
      {/* Header animado */}
      <AnimatedView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={[
          shadowStyle,
          {
            backgroundColor: "white",
            padding: 6,
            borderRadius: 10,
            margin: 10,
          },
        ]}
      >
        <StyledText className="text-3xl font-bold">Tus Grupos</StyledText>
        <StyledText className="text-gray-400 text-lg">
          Conéctate con tus compañeros
        </StyledText>
      </AnimatedView>

      {/* Lista de Grupos con animación */}
      <StyledView className="mt-4 px-3">
        <StyledText className="text-xl font-bold">Grupos activos</StyledText>

        {groupList.map((group, index) => (
          <AnimatedView
            key={index}
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: index * 150 }}
            style={[
              shadowStyle,
              {
                backgroundColor: "white",
                padding: 16,
                borderRadius: 10,
                marginTop: 8,
              },
            ]}
          >
            <StyledText
              className="text-xl font-bold"
              style={{ color: group.color }}
            >
              {group.name}
            </StyledText>
            <StyledText className="text-gray-400 text-base">
              {group.lastActivity}
            </StyledText>
          </AnimatedView>
        ))}
      </StyledView>

      {/* Barra de navegación */}
      <NavBar />
    </StyledView>
  );
}
