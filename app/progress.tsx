import { View, Text } from "react-native";
import { styled } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function Progress() {
  return (
    <StyledView className="flex-1 bg-[#EBEBEB]">
      {/* Header animado */}
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
          },
        ]}
      >
        <StyledText className="text-3xl font-bold">Tu progreso</StyledText>
        <StyledText className="text-gray-400 text-lg">
          Revisa tus avances y logros
        </StyledText>
      </AnimatedView>

      {/* Sección de progreso */}
      <StyledView className="mt-4 px-3">
        <AnimatedView
          from={{ opacity: 0, translateX: -20, scale: 0.9 }}
          animate={{ opacity: 1, translateX: 0, scale: 1 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <StyledText className="text-xl font-bold">
            Estadísticas generales
          </StyledText>
        </AnimatedView>

        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 200 }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            paddingHorizontal: 12,
          }}
        >
          <AnimatedView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 300 }}
            style={[
              shadowStyle,
              {
                backgroundColor: "white",
                padding: 16,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                marginHorizontal: 8,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="book-open"
              size={34}
              color="#2563eb"
            />
            <StyledText className="text-2xl font-bold">12h</StyledText>
            <StyledText className="text-gray-400 text-base">
              Estudio total
            </StyledText>
          </AnimatedView>

          <AnimatedView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400, delay: 500 }}
            style={[
              shadowStyle,
              {
                backgroundColor: "white",
                padding: 16,
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
                marginHorizontal: 8,
              },
            ]}
          >
            <MaterialCommunityIcons name="trophy" size={34} color="#dc2626" />
            <StyledText className="text-2xl font-bold">5</StyledText>
            <StyledText className="text-gray-400 text-base">
              Logros alcanzados
            </StyledText>
          </AnimatedView>
        </MotiView>
      </StyledView>

      {/* Barra de navegación */}
      <NavBar />
    </StyledView>
  );
}
