# Không dùng test framework, grader là seam duy nhất

Không cài Vitest, Testing Library hay Playwright. Toàn bộ việc kiểm chứng dựa vào
`scripts/check-repo.mjs` (kiểm tra tĩnh: file tồn tại, dependency, pattern trong source),
Lighthouse CI cho trang Home, và checklist thủ công trong `README.md`.

Đánh đổi: bài tập được chấm bằng chính grader này, và grader chỉ khẳng định được cấu trúc
chứ không khẳng định hành vi. Thêm framework sẽ dựng seam thứ hai không ai chấm, đồng thời
thêm devDependency và thời gian cài vào CI. Chọn theo đúng thứ được chấm.

## Hệ quả

- Hành vi grader không chứng minh được — giỏ hàng còn sau reload, toast, validate từng
  trường, không tràn ngang ở 375px — phải tự kiểm theo checklist.
- Check trong grader dựa trên regex source là smoke test, không phải bằng chứng hành vi.
  Đừng coi `[PASS]` là "đã đúng".
- Verify tay là bắt buộc trước khi đóng ticket, không phải tùy chọn.
