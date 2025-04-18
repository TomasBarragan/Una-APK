import { View, Text, ScrollView, Pressable } from "react-native";
import { styled } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import { PlusIcon } from "./Iconos";
import { useTareas } from "../contexts/TareasContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledScrollView = styled(ScrollView);

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

export default function TareasPendientes({
  onPlusPress,
}: {
  onPlusPress: () => void;
}) {
  const { tareas, agregarTarea, eliminarTarea, completarTarea } = useTareas();

  const handleCompletado = (id: number) => {
    completarTarea(id);
  };

  const handleEliminar = (id: number) => {
    eliminarTarea(id);
  };

  return (
    <StyledView
      className="bg-white rounded-[18px] p-4 shadow-md mx-4"
      style={[shadowStyle]}
    >
      {/* Header */}
      <StyledView className="flex-row justify-between items-center mb-1 px-2">
        <StyledText className="text-[24px] font-bold">
          Tareas Pendientes
        </StyledText>
        <StyledPressable className="rounded-full p-2" onPress={onPlusPress}>
          <PlusIcon />
        </StyledPressable>
      </StyledView>

      {/* Lista de tareas con scroll interno */}
      <StyledScrollView
        className="max-h-72"
        style={{ borderRadius: 18, padding: 4, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={false}
      >
        {tareas.map((tarea, index) => {
          const isFirst = index === 0;
          const isLast = index === tareas.length - 1;

          let style = {};
          if (tareas.length === 1) {
            style = { borderRadius: 16 };
          } else if (isFirst) {
            style = {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            };
          } else if (isLast) {
            style = {
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              marginBottom: 16,
            };
          } else {
            style = {
              borderRadius: 0,
            };
          }

          return (
            <StyledView
              key={tarea.id}
              className="bg-gray-50 px-4 py-3 m-1 flex-row justify-between items-center"
              style={[shadowStyle, style]}
            >
              <StyledView className="flex-row items-center space-x-3">
                <MaterialIcons name="menu-book" size={24} color="#2563EB" />
                <StyledText className="text-[16px] font-semibold">
                  {tarea.titulo}
                </StyledText>
              </StyledView>

              <StyledView className="flex-row space-x-3">
                {/* Botón completar */}
                <StyledPressable
                  className="p-1 rounded-full"
                  onPress={() => handleCompletado(tarea.id)}
                >
                  <MaterialIcons
                    name={
                      tarea.completada
                        ? "check-circle"
                        : "radio-button-unchecked"
                    }
                    size={24}
                    color={tarea.completada ? "#3B82F6" : "#CBD5E1"}
                  />
                </StyledPressable>

                {/* Botón eliminar */}
                <StyledPressable
                  className="p-1 rounded-full"
                  onPress={() => handleEliminar(tarea.id)}
                >
                  <MaterialIcons name="delete" size={24} color="#FCA5A5" />
                </StyledPressable>
              </StyledView>
            </StyledView>
          );
        })}
      </StyledScrollView>
    </StyledView>
  );
}
