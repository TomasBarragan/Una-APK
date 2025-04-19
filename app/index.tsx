import { MotiView } from "moti";
import { styled } from "nativewind";
import { useState } from "react";
import { Text, View } from "react-native";
import ModalTarea from "../components/AgregarTarea";
import { ClockIcon, PaperIcon } from "../components/Iconos";
import NavBar from "../components/NavBar";
import TareasPendientes from "../components/TareasPendientes";
import { useTareas } from "../contexts/TareasContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const AnimatedView = styled(MotiView);

const shadowStyle = {
  backgroundColor: "#fff",
  // iOS
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  // Android
  elevation: 5,
};

export default function Home() {
  const [modal, setModal] = useState(false);
  const { tareas } = useTareas();

  return (
    <StyledView className="flex-1 bg-[#EBEBEB]">
      {/* Header animado */}
      <AnimatedView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        style={[
          shadowStyle,
          { backgroundColor: "white", padding: 22, paddingHorizontal: 26 },
        ]}
      >
        <StyledText className="text-[32px] font-bold">
          Hola, @estudiante!
        </StyledText>
        <StyledText className="text-[20px] text-gray-400 font-bold">
          ¿Listo para mejorar tus estudios?
        </StyledText>
      </AnimatedView>
      {/* Estadísticas animadas */}
      <StyledView className="items-center mb-4">
        <MotiView
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 300 }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            width: "100%",
            paddingHorizontal: 8,
          }}
        >
          <AnimatedView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 300 }}
            style={[
              shadowStyle,
              {
                backgroundColor: "white",
                padding: 16,
                borderRadius: 22,
                flex: 1,
                alignItems: "center",
                marginHorizontal: 8,
              },
            ]}
          >
            <ClockIcon />
            <StyledText className="text-[32px] font-bold">2.5h</StyledText>
            <StyledText className="text-[20px] text-gray-400 font-bold">
              Estudio
            </StyledText>
          </AnimatedView>
          <AnimatedView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 500 }}
            style={[
              shadowStyle,
              {
                backgroundColor: "white",
                padding: 16,
                borderRadius: 22,
                flex: 1,
                alignItems: "center",
                marginHorizontal: 8,
              },
            ]}
          >
            <PaperIcon />
            <StyledText className="text-[32px] font-bold">
              {tareas.length}
            </StyledText>
            <StyledText className="text-[20px] text-gray-400 font-bold">
              Tareas
            </StyledText>
          </AnimatedView>
        </MotiView>
      </StyledView>
      {/* Tareas Pendientes con scroll */}
      <AnimatedView
        from={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "timing", duration: 500, delay: 300 }}
      >
        <TareasPendientes onPlusPress={() => setModal(true)} />
      </AnimatedView>
      {/* Modal para agregar tareas */}
      <StyledView>
        <ModalTarea visible={modal} onClose={() => setModal(false)} />
      </StyledView>
      {/* Barra de navegación */}
      <NavBar />
    </StyledView>
  );
}
