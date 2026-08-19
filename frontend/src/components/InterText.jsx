import { forwardRef } from "react";
import { StyleSheet, Text as NativeText, TextInput as NativeTextInput } from "react-native";

const fontFamilies = {
  400: "Inter_400Regular",
  500: "Inter_500Medium",
  600: "Inter_600SemiBold",
  700: "Inter_700Bold",
};

function resolveFontFamily(style) {
  const { fontWeight } = StyleSheet.flatten(style) || {};
  const numericWeight = Number.parseInt(fontWeight, 10);

  if (fontWeight === "bold" || numericWeight >= 700) return fontFamilies[700];
  if (numericWeight >= 600) return fontFamilies[600];
  if (numericWeight >= 500) return fontFamilies[500];
  return fontFamilies[400];
}

const InterText = forwardRef(function InterText({ style, ...props }, ref) {
  return (
    <NativeText
      ref={ref}
      {...props}
      style={[style, { fontFamily: resolveFontFamily(style), fontWeight: "normal" }]}
    />
  );
});

export const InterTextInput = forwardRef(function InterTextInput(
  { style, ...props },
  ref,
) {
  return (
    <NativeTextInput
      ref={ref}
      {...props}
      style={[style, { fontFamily: resolveFontFamily(style), fontWeight: "normal" }]}
    />
  );
});

export default InterText;
