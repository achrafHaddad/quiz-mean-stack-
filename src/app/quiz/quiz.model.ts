export interface Question {
  question: string;
  rep1: string;
  rep2: string;
  rep3: string;
  rep4: string;
  correctAnswer: string;
}

export class Quiz {
  title: string;
  time: number;
  questions: Question[];
}
