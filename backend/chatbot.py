from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()
rwhFile = client.files.create(
  file = open("data/rwhPotential.pdf","rb"),
  purpose="user_data"
)
def queryChatGpt(query:str):

  response = client.responses.create(
    model="gpt-5",
    input=[
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": query,
          },
          {
            "type": "input_file",
            "file_id": rwhFile.id,
          },
          {
            "type": "input_file",
            "file_url": "https://pdfs.semanticscholar.org/d0f5/35868c9a832dd55a3f53cbe3d3b3a0969603.pdf",
          },
        ],
      },
    ]
  )

  return response.output_text

if __name__ == "__main__":
  # test query
  query = "how is rwh feasibiliy calculated and what are some of the rwh types"
  print(queryChatGpt(query))
