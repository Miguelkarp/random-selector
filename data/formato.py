#!/usr/bin/env python3

import re

archivo_entrada = "datos.txt"
archivo_salida = "data_format.txt"
categoria = ""
with open(archivo_entrada, "r", encoding="utf-8") as fin, \
     open(archivo_salida, "w", encoding="utf-8") as fout:
    for linea in fin:
        linea = linea.strip()
        if not linea:
            continue
        # Ignorar separadores
        if set(linea) == {"="}:
            continue
        # Detectar encabezados (todo en mayúsculas)
        if re.fullmatch(r"[A-ZÁÉÍÓÚÑÜ0-9 ()\-]+", linea):
            categoria = linea
            continue
        # Detectar temas numerados
        m = re.match(r"(\d+)\.?\s+(.*)", linea)
        if m:
            numero = m.group(1)
            tema = m.group(2)
            fout.write(f"{numero} {categoria} {tema}\n")
print("Archivo generado correctamente.")
