import { personalVoteBackground } from "src/utils/personalVoteBackground";

test("util: personalVoteBackground", () => {
    expect(personalVoteBackground(3)).toBe("strong-agree");
    expect(personalVoteBackground(2)).toBe("agree");
    expect(personalVoteBackground(1)).toBe("partial-agree");
    expect(personalVoteBackground(0)).toBe("neutral");
    expect(personalVoteBackground(-1)).toBe("partial-disagree");
    expect(personalVoteBackground(-2)).toBe("disagree");
    expect(personalVoteBackground(-3)).toBe("strong-disagree");
    expect(personalVoteBackground(99)).toBe("");
    expect(personalVoteBackground(-0)).toBe("neutral");
    expect(personalVoteBackground(4)).toBe("");
    expect(personalVoteBackground(24178000.00)).toBe("");
    expect(personalVoteBackground(1.23212312312)).toBe("");
});