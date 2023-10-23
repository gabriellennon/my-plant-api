# tombombadil
API responsável pelo catálogo de plantas, assim como registrar a rega de cada uma delas

## Site
- Gerador de imagem das plantas com IA[https://hotpot.ai/]
   planta Peperomia em fundo transparenteem um jarro em um fundo transparente
- Upload de imagens[https://gabriel-lennon.imgbb.com/]
- Informações da planta (Perguntando ao chatGPT dessa forma)
   Faça uma pesquisa sobre a planta Peperomia e me retorne 
   Sobre a planta: se pode pegar sol ou nao, e qual ambiente ela deve ficar
   Tipo de rega: Quantos ml de água preciso para regar ela e no período de intervalo de quanto tempo

   
# MVP

 - Cadastro da planta (Apenas para popular a base) ✅
 - Listagem de plantas ✅
 - Registro de planta do usuário ✅
 - Listagem de plantas do usuário ✅
 - Exclusão de planta do usuário ✅


## Cadastro da planta (Apenas para popular a base)

O cadastro deve ser feito via JSON com os seguintes campos:
  id                        String
  name                      String
  about                     String
  water_tips                String
  photo                     String
  frequency_time            Int
  frequency_repeat_everyday String

## Listagem de plantas

A consulta deve permitir carregar dados de todas as plantas. 

## Registro de planta do usuário

O registro deve ser feito via JSON com os seguintes campos:

 - Id da Planta (Obrigatório)
 - Id do Usuário (Obrigatório)
 - Nome da Planta (Obrigatório)
 - Dicas de rega (Obrigatório) = water_tips
 - Foto da planta (Obrigatório)
 - Ambiente onde a planta ficará (Obrigatório)
 - Frequencia de vezes de rega (Obrigatório) - exemplo 2x, 1x
 - Frequencia de repeticao (Obrigatório) - periodicidade: semana/mes/ano/diário

 - Horário para ser notificado da rega (Obrigatório)
    * horário específico do dia em que deseja ser lembrado
 - Data de lembrete (Obrigatorio) 
    * Data atual +  e horário que o usuário selecionou + 
    * A partir do horário (em horas e minutos) que o usuário escolher para ser lembrado, eu pego o número de vezes que a planta precisa ser regada (dia, semana ou mes), ou seja, 2x por semana, a partir da data atual eu calculo a data que ele vai se lembrado
    * Se a frequência for semanal, você pode calcular os lembretes para as próximas semanas com base na data atual e no dia da semana escolhido.
    * Se a frequência for mensal, calcule os lembretes com base na data atual e no dia do mês escolhido.

    Exemplo:
    Planta A -> 1x por semana, 14:30

## Listagem de plantas do usuário

A consulta deve permitir carregar os dados das plantas do usuário.
 - Id do usuário (Obrigatório)


## Exclusão de planta do usuário

Exclusão das plantas do usuário.
 - Id do usuário (Obrigatório)
 - Id da planta (Obrigatório)