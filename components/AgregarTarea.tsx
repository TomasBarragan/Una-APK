import { styled } from "nativewind";
import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View, Alert } from "react-native";
import { useTareas } from "../contexts/TareasContext";
import { tareaSchema } from "../schemas/tareasSchema";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);
const StyledTextInput = styled(TextInput);

const obtenerFechaDesdeDiaYMes = (dia: string, mes: string): Date | null => {
  const year = new Date().getFullYear();
  const day = parseInt(dia);
  const month = parseInt(mes);

  if (
    isNaN(day) ||
    isNaN(month) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  const fecha = new Date(year, month - 1, day);
  return isNaN(fecha.getTime()) ? null : fecha;
};

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

  const actualizarCampo = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const resetForm = () => {
    setForm({ titulo: "", descripcion: "", dia: "", mes: "" });
    setErrores({});
  };

  const handleCrearTarea = () => {
    const fecha = obtenerFechaDesdeDiaYMes(form.dia, form.mes);

    if (!fecha) {
      setErrores((prev) => ({
        ...prev,
        dia: "Día o mes inválido",
        mes: "Día o mes inválido",
      }));
      return;
    }

    const tareaConFecha = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      fecha,
    };

    const resultado = tareaSchema.safeParse(tareaConFecha);

    if (!resultado.success) {
      const nuevosErrores: { [key: string]: string } = {};
      resultado.error.errors.forEach((err) => {
        if (err.path[0]) nuevosErrores[err.path[0]] = err.message;
      });
      setErrores(nuevosErrores);
      return;
    }

    agregarTarea({ id: 0, ...tareaConFecha });
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
    <StyledView>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={handleCancelar}
      >
        <StyledView className="flex-1 justify-center items-center bg-black/40">
          <StyledView className="bg-white w-4/5 p-6 rounded-[22px]">
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
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
}
