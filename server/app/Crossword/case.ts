    export class Case {
        private isBlack: boolean;

        private horizontalWordLength: number;
        private horizontalPositionInWord: number;

        private verticalWordLength: number;
        private verticalPositionInWord: number;

        // private letterTyped: string;
        private rightLetter: string;

        private isAConstraint: boolean;

        constructor() {
            this.isBlack = false;
            this.isAConstraint = false;
            this.rightLetter = "";
        }

        public getIsBlack(): boolean {
            return this.isBlack;
        }

        public getHorizontalWordLength(): number {
            return this.horizontalWordLength;
        }

        public getHorizontalPositionInWord(): number {
            return this.horizontalPositionInWord;
        }

        public getVerticalWordLength(): number {
            return this.verticalWordLength;
        }

        public getVerticalPositionInWord(): number {
            return this.verticalPositionInWord;
        }

        public getRightLetter(): string {
            return this.rightLetter;
        }

        public getIsAConstraint(): boolean {
            return this.isAConstraint;
        }

        public setIsBlack(value: boolean): void {
            this.isBlack = value;
        }

        public setHorizontalWordLength(value: number): void {
            this.horizontalWordLength = value;
        }

        public setHorizontalPositionInWord(value: number): void {
            this.horizontalPositionInWord = value;
        }

        public setVerticalWordLength(value: number): void {
            this.verticalWordLength = value;
        }

        public setVerticalPositionInWord(value: number): void {
            this.verticalPositionInWord = value;
        }

        public setRightLetter(value: string): void {
            this.rightLetter = value;
        }

        public setConstraint(value: boolean): void {
            this.isAConstraint = value;
        }
    }
