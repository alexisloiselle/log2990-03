    export class Case {
        private isBlack: boolean;

        private horizontalWordLength: number;
        private horizontalPositionInWord: number;

        private verticalWordLength: number;
        private verticalPositionInWord: number;

        private letterTyped: string;
        private rightLetter: string;

        private isAConstraint: boolean;

        constructor() {
            this.isBlack = false;
            this.isAConstraint = false;
            this.rightLetter = "";
        }

        public getIsBlack() {
            return this.isBlack;
        }

        public getHorizontalWordLength() {
            return this.horizontalWordLength;
        }

        public getHorizontalPositionInWord() {
            return this.horizontalPositionInWord;
        }

        public getVerticalWordLength() {
            return this.verticalWordLength;
        }

        public getVerticalPositionInWord() {
            return this.verticalPositionInWord;
        }

        public getRightLetter() {
            return this.rightLetter;
        }

        public getIsAConstraint() {
            return this.isAConstraint;
        }

        public setIsBlack(value: boolean) {
            this.isBlack = value;
        }

        public setHorizontalWordLength(value: number) {
            this.horizontalWordLength = value;
        }

        public setHorizontalPositionInWord(value: number) {
            this.horizontalPositionInWord = value;
        }

        public setVerticalWordLength(value: number) {
            this.verticalWordLength = value;
        }

        public setVerticalPositionInWord(value: number) {
            this.verticalPositionInWord = value;
        }

        public setRightLetter(value: string) {
            this.rightLetter = value;
        }

        public setConstraint(value: boolean) {
            this.isAConstraint = value;
        }
    }
