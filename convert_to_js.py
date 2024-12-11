import csv
import json

# Input and output files
input_file = "verbs.csv"
output_file = "vocabulary.js"

# Read the CSV and process data
vocabulary = []

with open(input_file, newline='', encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Split conjugations and definitions into lists
        presente_spanish = row["Presente (Spanish)"].split(",")
        presente_english = row["Presente (English)"].split(",")
        preterito_spanish = row["Pretérito (Spanish)"].split(",")
        preterito_english = row["Pretérito (English)"].split(",")
        futuro_spanish = row["Futuro (Spanish)"].split(",")
        futuro_english = row["Futuro (English)"].split(",")

        # Build the vocabulary entry
        vocabulary.append({
            "verb": row["Verb"],
            "translation": row["Translation"],
            "presente": [
                {"conjugation": sp.strip(), "definition": en.strip()}
                for sp, en in zip(presente_spanish, presente_english)
            ],
            "preterito": [
                {"conjugation": sp.strip(), "definition": en.strip()}
                for sp, en in zip(preterito_spanish, preterito_english)
            ],
            "futuro": [
                {"conjugation": sp.strip(), "definition": en.strip()}
                for sp, en in zip(futuro_spanish, futuro_english)
            ]
        })

# Write output to a JavaScript file
with open(output_file, "w", encoding="utf-8") as jsfile:
    jsfile.write("const vocabulary = ")
    jsfile.write(json.dumps(vocabulary, indent=4, ensure_ascii=False))
    jsfile.write(";\n\n")
    jsfile.write("export default vocabulary;\n")

print(f"Vocabulary saved to {output_file} with export default.")
