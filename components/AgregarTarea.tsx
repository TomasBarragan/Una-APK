import { styled } from "nativewind";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  Animated,
} from "react-native";
import { useTareas } from "../contexts/TareasContext";
import { tareaSchema } from "../schemas/tareasSchema";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledTextInput = styled(TextInput);

export default function ModalTarea({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { agregarTarea } = useTareas();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    dia: "",
    mes: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [slideAnim] = useState(new Animated.Value(500));
  const [isVisibleInterno, setIsVisibleInterno] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisibleInterno(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsVisibleInterno(false);
      });
    }
  }, [visible]);

  const actualizarCampo = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const resetForm = () => {
    setForm({ titulo: "", descripcion: "", dia: "", mes: "" });
    setErrores({});
  };

  const handleCrearTarea = () => {
    const resultado = tareaSchema.safeParse(form);

    if (!resultado.success) {
      const nuevosErrores: { [key: string]: string } = {};
      resultado.error.errors.forEach((err) => {
        if (err.path[0]) nuevosErrores[err.path[0]] = err.message;
      });
      setErrores(nuevosErrores);
      return;
    }

    const tarea = { ...form, id: Date.now(), completada: false };

    agregarTarea(tarea);
    resetForm();
    onClose();
  };

  const handleCancelar = () => {
    resetForm();
    onClose();
  };

  const renderCampo = (
    label: string,
    placeholder: string,
    key: keyof typeof form,
    multiline: boolean = false
  ) => (
    <>
      <StyledText className="text-[17px] font-bold mb-2">{label}</StyledText>
      <StyledTextInput
        multiline={multiline}
        value={form[key]}
        onChangeText={(text) => actualizarCampo(key, text)}
        placeholder={placeholder}
        keyboardType="default"
        className="bg-gray-100 p-3 rounded-[15px] mb-1 text-[15px]"
      />
      {errores[key] ? (
        <StyledText className="text-red-500 text-sm mb-2">
          {errores[key]}
        </StyledText>
      ) : (
        <StyledView className="mb-2" />
      )}
    </>
  );

  return (
    <Modal
      animationType="none"
      transparent
      visible={isVisibleInterno}
      onRequestClose={handleCancelar}
    >
      <StyledView className="flex-1 justify-center items-center bg-black/40">
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
            backgroundColor: "white",
            width: "85%",
            padding: 24,
            borderRadius: 22,
          }}
        >
          <StyledText className="text-[20px] font-bold mb-4">
            Crear Nueva Tarea
          </StyledText>

          {renderCampo("Título", "Escribe el título...", "titulo", true)}
          {renderCampo(
            "Descripción",
            "Escribe la descripción...",
            "descripcion",
            true
          )}

          <StyledView className="flex-row gap-2">
            <StyledView className="flex-1">
              {renderCampo("Día", "Ej: 20", "dia")}
            </StyledView>
            <StyledView className="flex-1">
              {renderCampo("Mes", "Ej: 04", "mes")}
            </StyledView>
          </StyledView>

          <StyledView className="flex-row justify-between mt-1">
            <StyledPressable
              onPress={handleCancelar}
              className="bg-[#FF4D4D] px-4 py-3 rounded-[15px]"
            >
              <StyledText className="text-white font-bold text-[13px]">
                CANCELAR
              </StyledText>
            </StyledPressable>
            <StyledPressable
              onPress={handleCrearTarea}
              className="bg-[#007AFF] px-7 py-3 rounded-[15px]"
            >
              <StyledText className="text-white font-bold text-[13px]">
                CREAR TAREA
              </StyledText>
            </StyledPressable>
          </StyledView>
        </Animated.View>
      </StyledView>
    </Modal>
  );
}
