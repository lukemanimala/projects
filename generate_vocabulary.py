from mlconjug import Conjugator
import json

# Initialize conjugator for Spanish
conjugator = Conjugator(language='es')

# Input: List of verbs with translations
verbs = [
    {"verb": "aceptar", "translation": "to accept"},
    {"verb": "ahorrar", "translation": "to save money"},
    {"verb": "amar", "translation": "to love"},
    {"verb": "apagar", "translation": "to turn off"}
]

# Pronouns for reference
pronouns = ["I", "You (informal)", "He/She", "We", "You all (informal, Spain)", "They/You all (formal)"]

# Helper function to generate conjugations
def generate_conjugations(verb):
    conjugations = conjugator.conjugate(verb)
    presente = conjugations['indicativo']['presente']
    preterito = conjugations['indicativo']['pretérito']

    return {
        "presente": [
            {"conjugation": form, "definition": f"{pronouns[i]} {form}"}
            for i, form in enumerate(presente.values())
        ],
        "preterito": [
            {"conjugation": form, "definition": f"{pronouns[i]} {form}"}
            for i, form in enumerate(preterito.values())
        ]
    }

# Build the vocabulary object
vocabulary = []
for item in verbs:
    verb_data = {
        "verb": item["verb"],
        "translation": item["translation"]
    }
    verb_data.update(generate_conjugations(item["verb"]))
    vocabulary.append(verb_data)

# Save to JSON file
output_file = "vocabulary.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(vocabulary, f, ensure_ascii=False, indent=4)

print(f"Vocabulary saved to {output_file}")
