package jsoncolor

import (
	"bytes"
	"io"
	"testing"
)

func BenchmarkWrite(b *testing.B) {
	jsonStr := `{"hash":{"a":1,"b":2},"array":[3,4,{"nested":true,"values":[1,2,3,4,5]}],"more":"data","even_more":{"nested":{"deeply":true}}}`
	indent := "  "

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		r := bytes.NewBufferString(jsonStr)
		w := io.Discard
		_ = Write(w, r, indent)
	}
}
